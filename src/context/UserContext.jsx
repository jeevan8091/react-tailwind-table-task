import { useEffect, useMemo, useState } from 'react';
import { UserContext } from './UserContextValue';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `local-${Date.now()}`;
};

const toUserRecord = (values) => ({
  id: createId(),
  name: values.fullName,
  username: values.username,
  email: values.email,
  phone: values.phone,
  website: values.website,
  company: {
    name: values.company,
    catchPhrase: 'Added from admin dashboard',
  },
  address: {
    street: values.address,
    suite: '',
    city: '',
    geo: {
      lat: 'N/A',
      lng: 'N/A',
    },
  },
  isLocal: true,
});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch(USERS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load users. Please try again.');
        }

        return response.json();
      })
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setError('');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message || 'Unable to load users. Please try again.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const addUser = (values) => {
    const newUser = toUserRecord(values);
    setUsers((currentUsers) => [...currentUsers, newUser]);
    return newUser;
  };

  const updateUser = (updatedUser) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  };

  const deleteUser = (userId) => {
    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
  };

  const addedUsers = useMemo(
    () => users.filter((user) => user.isLocal),
    [users],
  );

  const value = useMemo(
    () => ({
      users,
      addedUsers,
      loading,
      error,
      addUser,
      updateUser,
      deleteUser,
    }),
    [addedUsers, error, loading, users],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
