const UserTableHeader = () => {
  return (
    <thead>
      <tr className="bg-slate-100 text-[12px] uppercase tracking-[0.08em] text-slate-600">
        <th className="px-4 py-2 font-semibold">ID</th>
        <th className="px-4 py-2 font-semibold">User</th>
        <th className="px-4 py-2 font-semibold">Email</th>
        <th className="px-4 py-2 font-semibold">Phone</th>
        <th className="px-4 py-2 font-semibold">Company</th>
        <th className="px-4 py-2 font-semibold text-right">Actions</th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
