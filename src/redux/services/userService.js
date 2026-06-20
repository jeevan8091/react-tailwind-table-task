import userApi from '../api/userApi';

const userService = {
  fetchUsersService: () => userApi.getUsers(),
  addUserService: (userData) => userApi.addUser(userData),
  updateUserService: (updatedUser) => userApi.updateUser(updatedUser),
  deleteUserService: (userId) => userApi.deleteUser(userId),
};

export default userService;
