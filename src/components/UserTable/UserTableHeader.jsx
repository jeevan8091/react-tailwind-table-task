const UserTableHeader = () => {
  return (
    <thead>
      <tr className="bg-slate-100 text-xs uppercase tracking-wider text-slate-600">
        <th className="px-4 py-2 font-bold">ID</th>
        <th className="px-4 py-2 font-bold">User</th>
        <th className="px-4 py-2 font-bold">Email</th>
        <th className="px-4 py-2 font-bold">Phone</th>
        <th className="px-4 py-2 font-bold">Company</th>
        <th className="px-4 py-2 font-bold text-right">Actions</th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
