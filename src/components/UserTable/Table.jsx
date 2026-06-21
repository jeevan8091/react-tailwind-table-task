import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers, updateUser } from '../../redux/thunk/userThunk';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditUserModal from './EditUserModal';
import SearchBar from './SearchBar';
import UserDetailsModal from './UserDetailsModal';
import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';

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

const Table = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [detailsUser, setDetailsUser] = useState(null);

  useEffect(() => {
    if (!users.length && !loading) {
      dispatch(fetchUsers());
    }
  }, [dispatch, loading, users.length]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return users;

    return users.filter((user) => getSearchText(user).includes(query));
  }, [searchQuery, users]);

  const handleSaveUser = (updatedUser) => {
    dispatch(updateUser(updatedUser));
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
    setDeletingUser(null);
  };

  if (loading) {
    return (
      <div className="w-full space-y-6 animate-pulse">
        <div className="mb-6">
          <div className="h-8 w-56 bg-slate-200 rounded-lg mb-2"></div>
          <div className="h-4 w-80 bg-slate-100 rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"></div>
          ))}
        </div>

        <div className="h-12 w-full bg-white rounded-xl border border-slate-200"></div>
        <div className="h-96 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div
          role="alert"
          className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm"
        >
          <h2 className="text-base font-bold text-slate-800">Could not load users</h2>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredUsers={filteredUsers}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full border-separate border-spacing-y-2 text-left text-slate-600">
            <UserTableHeader />
            <tbody className="bg-transparent">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    index={index}
                    onEdit={setEditingUser}
                    onDelete={setDeletingUser}
                    onViewDetails={setDetailsUser}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center bg-white rounded-2xl">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">No matching users found</h3>
                      <p className="text-xs text-slate-400 max-w-xs">
                        Try refining your keywords or checking for spelling errors.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}

      {deletingUser && (
        <DeleteConfirmationModal
          user={deletingUser}
          onCancel={() => setDeletingUser(null)}
          onDelete={handleDeleteUser}
        />
      )}

      {detailsUser && (
        <UserDetailsModal
          user={detailsUser}
          onClose={() => setDetailsUser(null)}
        />
      )}
    </div>
  );
};

export default Table;
