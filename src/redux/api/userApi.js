const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const LOCAL_USERS_KEY = 'workforce_users_local_v1';
const USER_OVERRIDES_KEY = 'workforce_users_overrides_v1';
const DELETED_USERS_KEY = 'workforce_users_deleted_v1';

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `local-${Date.now()}`;
};

const toUserRecord = (values) => ({
  id: values.id ?? createId(),
  name: values.name ?? values.fullName ?? '',
  username: values.username ?? values.email?.split('@')[0] ?? '',
  email: values.email ?? '',
  phone: values.phone ?? '',
  website: values.website ?? '',
  company: {
    name: values.company ?? values.department ?? '',
    catchPhrase: values.designation ?? 'Added from admin dashboard',
  },
  address: {
    street: values.address ?? '',
    suite: '',
    city: values.city ?? '',
    zipcode: values.pincode ?? '',
    geo: {
      lat: 'N/A',
      lng: 'N/A',
    },
  },
  department: values.department ?? '',
  designation: values.designation ?? '',
  salary: values.salary ?? '',
  isLocal: true,
});

const getLocalUsers = () => readStorage(LOCAL_USERS_KEY, []);
const getUserOverrides = () => readStorage(USER_OVERRIDES_KEY, {});
const getDeletedUsers = () => readStorage(DELETED_USERS_KEY, []);

const userApi = {
  getUsers: async () => {
    const response = await fetch(USERS_URL);
    if (!response.ok) {
      throw new Error('Unable to load users. Please try again.');
    }

    const apiUsers = await response.json();
    const overrides = getUserOverrides();
    const deletedUsers = new Set(getDeletedUsers().map(String));
    const localUsers = getLocalUsers();

    const syncedUsers = (Array.isArray(apiUsers) ? apiUsers : [])
      .filter((user) => !deletedUsers.has(String(user.id)))
      .map((user) => overrides[user.id] ?? user);

    return [...syncedUsers, ...localUsers];
  },

  addUser: async (userData) => {
    const newUser = toUserRecord(userData);
    const localUsers = getLocalUsers();
    writeStorage(LOCAL_USERS_KEY, [...localUsers, newUser]);
    return newUser;
  },

  updateUser: async (updatedUser) => {
    if (updatedUser.isLocal) {
      const localUsers = getLocalUsers().map((user) =>
        String(user.id) === String(updatedUser.id) ? updatedUser : user,
      );
      writeStorage(LOCAL_USERS_KEY, localUsers);
    } else {
      const overrides = getUserOverrides();
      writeStorage(USER_OVERRIDES_KEY, {
        ...overrides,
        [updatedUser.id]: updatedUser,
      });
    }

    return updatedUser;
  },

  deleteUser: async (userId) => {
    const id = String(userId);
    const localUsers = getLocalUsers().filter((user) => String(user.id) !== id);
    const overrides = getUserOverrides();
    const deletedUsers = new Set(getDeletedUsers().map(String));

    delete overrides[userId];
    deletedUsers.add(id);

    writeStorage(LOCAL_USERS_KEY, localUsers);
    writeStorage(USER_OVERRIDES_KEY, overrides);
    writeStorage(DELETED_USERS_KEY, [...deletedUsers]);

    return userId;
  },
};

export default userApi;
