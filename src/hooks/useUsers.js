import { useMemo } from 'react';
import { useUserContext } from '../context/useUserContext';

const getSearchText = (user) =>
  [
    user.name,
    user.username,
    user.email,
    user.company?.name,
    user.address?.city,
    user.address?.street,
    user.phone,
    user.website,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

export const useUsers = (searchQuery = '') => {
  const { users, employeeRecords, loading, error, saveEmployeeRecord, updateUser, deleteUser } = useUserContext();

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return users;

    return users.filter((user) => getSearchText(user).includes(query));
  }, [users, searchQuery]);

  return {
    users,
    employeeRecords,
    filteredUsers,
    loading,
    error,
    saveEmployeeRecord,
    updateUser,
    deleteUser,
  };
};
