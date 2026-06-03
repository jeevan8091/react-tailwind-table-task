const UserTableHeader = () => {
  return (
    <thead>
      <tr className="text-xs text-slate-600 uppercase bg-slate-100 tracking-wider">
        <th className="px-6 py-4 font-bold rounded-l-xl">ID</th>
        <th className="px-6 py-4 font-bold">User Details</th>
        <th className="px-6 py-4 font-bold">Email Address</th>
        <th className="px-6 py-4 font-bold">Phone Number</th>
        <th className="px-6 py-4 font-bold">Website</th>
        <th className="px-6 py-4 font-bold">Full Address</th>
        <th className="px-6 py-4 font-bold">Company details</th>
        <th className="px-6 py-4 font-bold rounded-r-xl text-right">Actions</th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
