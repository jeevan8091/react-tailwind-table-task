const UserTableHeader = () => {
  return (
    <thead>
      <tr className="bg-slate-100 text-xs font-semibold text-slate-500">
        <th className="px-4 py-3 font-semibold">ID</th>
        <th className="px-4 py-3 font-semibold">User</th>
        <th className="px-4 py-3 font-semibold">Email</th>
        <th className="px-4 py-3 font-semibold">Phone</th>
        <th className="px-4 py-3 font-semibold">Company</th>
        <th className="px-4 py-3 font-semibold text-right">Actions</th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
