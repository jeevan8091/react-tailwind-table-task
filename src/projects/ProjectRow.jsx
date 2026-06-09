import ProjectActions from './ProjectActions';

const ProjectRow = ({ row, index, onChange, onDeleteRow, rowError = {} }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

  // Helper to get error styles
  const getInputClass = (field) =>
    `w-full rounded-lg border ${rowError[field] ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'} px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white focus:outline-none transition-colors`;

  const renderError = (field) =>
    rowError[field] ? (
      <p className="mt-1 text-xs text-red-600 font-medium">{rowError[field]}</p>
    ) : null;

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-5 py-4 text-sm font-semibold text-slate-700">{row.sNo}</td>
      <td className="px-5 py-4">
        <input
          type="text"
          name="name"
          placeholder="Enter project name"
          value={row.name}
          onChange={handleInputChange}
          className={getInputClass('name')}
        />
        {renderError('name')}
      </td>
      <td className="px-5 py-4">
        <input
          type="text"
          name="shortCode"
          placeholder="Enter short code"
          value={row.shortCode}
          onChange={handleInputChange}
          className={getInputClass('shortCode')}
        />
        {renderError('shortCode')}
      </td>
      <td className="px-5 py-4">
        <input
          type="date"
          name="projectDate"
          value={row.projectDate}
          onChange={handleInputChange}
          className={getInputClass('projectDate')}
        />
        {renderError('projectDate')}
      </td>
      <td className="px-5 py-4">
        <select
          name="status"
          value={row.status}
          onChange={handleInputChange}
          className={getInputClass('status')}
        >
          <option value="">Select...</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
        </select>
        {renderError('status')}
      </td>
      <td className="px-5 py-4 text-center">
        <ProjectActions index={index} onDelete={onDeleteRow} />
      </td>
    </tr>
  );
};

export default ProjectRow;
