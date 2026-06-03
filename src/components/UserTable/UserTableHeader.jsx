// Reusable table column header row
const UserTableHeader = () => {
  return (
    <thead>
      <tr className="text-xs text-white uppercase bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 tracking-wider">
        <th className="px-6 py-4 font-black rounded-l-2xl">ID</th>
        <th className="px-6 py-4 font-black">User Details</th>
        <th className="px-6 py-4 font-black">Email Address</th>
        <th className="px-6 py-4 font-black">Phone Number</th>
        <th className="px-6 py-4 font-black">Website</th>
        <th className="px-6 py-4 font-black">Full Address</th>
        <th className="px-6 py-4 font-black rounded-r-2xl">Company details</th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
