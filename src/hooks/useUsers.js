import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/thunk/userThunk';

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
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (!users.length && !loading) {
      dispatch(fetchUsers());
    }
  }, [dispatch, loading, users.length]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return users;

    return users.filter((user) => getSearchText(user).includes(query));
  }, [users, searchQuery]);

  const employeeRecords = useMemo(
    () => users.filter((user) => user.isLocal),
    [users],
  );

  return { users, employeeRecords, filteredUsers, loading, error };
};
