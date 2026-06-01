import React, { useState, useEffect } from 'react';

const Table = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // API loading sequence for User list data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold text-blue-600 animate-pulse">Loading User Directory...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Directory</h1>
      </div>

      {/* Styled Responsive Core Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 font-bold">ID</th>
              <th className="px-6 py-4 font-bold">Name Details</th>
              <th className="px-6 py-4 font-bold">Email</th>
              <th className="px-6 py-4 font-bold">Phone Number</th>
              <th className="px-6 py-4 font-bold">Website</th>
              <th className="px-6 py-4 font-bold">Full Address</th>
              <th className="px-6 py-4 font-bold">Company</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                <td className="px-4 py-4 font-medium text-gray-900">{user.id}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-400">@{user.username}</div>
                </td>
                <td className="px-6 py-4 text-blue-600 hover:underline">{user.email}</td>
                <td className="px-6 py-4 font-medium text-gray-700">{user.phone}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    {user.website}
                  </span>
                </td>
                
                {/* Modified Address Block with Geo Location Included */}
                <td className="px-6 py-4 max-w-xs">
                  <div className="text-gray-800 text-xs font-medium">
                    {`${user.address.street}, ${user.address.suite}, ${user.address.city} - ${user.address.zipcode}`}
                  </div>
                  <div className="text-gray-400 text-[11px] mt-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 inline-block font-mono">
                    {`📍 Geo: ${user.address.geo.lat}, ${user.address.geo.lng}`}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-medium text-gray-800">{user.company.name}</div>
                  <div className="text-xs italic text-gray-400 truncate max-w-[150px]">
                    "{user.company.catchPhrase}"
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;