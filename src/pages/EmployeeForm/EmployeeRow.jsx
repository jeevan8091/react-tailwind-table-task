import EmployeeActions from './EmployeeActions';

const EmployeeRow = ({ row, index, onChange, onDeleteRow, rowError = {} }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    onChange(index, name, fieldValue);
  };

  // Helper to get error styles
  const getInputClass = (field) =>
    `w-full rounded-lg border ${rowError[field] ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'} px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white focus:outline-none transition-colors`;

  const renderError = (field) =>
    rowError[field] ? (
      <p className="mt-1 text-xs text-red-600 font-medium">Required</p>
    ) : null;

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-5 py-4 text-sm font-semibold text-slate-700">{row.sNo}</td>
      <td className="px-5 py-4">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={row.name}
          onChange={handleInputChange}
          className={getInputClass('name')}
        />
        {renderError('name')}
      </td>
      <td className="px-5 py-4">
        <input
          type="tel"
          name="mobile"
          placeholder="Enter mobile"
          value={row.mobile}
          onChange={handleInputChange}
          className={getInputClass('mobile')}
        />
        {renderError('mobile')}
      </td>
      <td className="px-5 py-4">
        <input
          type="date"
          name="dob"
          value={row.dob}
          onChange={handleInputChange}
          className={getInputClass('dob')}
        />
        {renderError('dob')}
      </td>
      <td className="px-5 py-4">
        <select
          name="relation"
          value={row.relation}
          onChange={handleInputChange}
          className={getInputClass('relation')}
        >
          <option value="">Select...</option>
          <option value="Family">Family</option>
          <option value="Friend">Friend</option>
          <option value="Colleague">Colleague</option>
        </select>
        {renderError('relation')}
      </td>
      <td className="px-5 py-4">
        <select
          name="profession"
          value={row.profession}
          onChange={handleInputChange}
          className={getInputClass('profession')}
        >
          <option value="">Select...</option>
          <option value="Engineer">Engineer</option>
          <option value="Manager">Manager</option>
          <option value="Analyst">Analyst</option>
        </select>
        {renderError('profession')}
      </td>
      <td className="px-5 py-4 text-center">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            name="emergency"
            checked={row.emergency}
            onChange={handleInputChange}
            className="h-5 w-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer transition-all"
          />
        </div>
      </td>
      <td className="px-5 py-4 text-center">
        <EmployeeActions index={index} onDelete={onDeleteRow} />
      </td>
    </tr>
  );
};

export default EmployeeRow;
