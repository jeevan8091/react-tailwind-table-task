import ProjectRow from './ProjectRow';

const ProjectTable = ({ rows, onChange, onAddRow, onDeleteRow, rowErrors }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full border-collapse">
        <thead className="bg-slate-100 border-b border-slate-200">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">S.No</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Project Name</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Project Short Code</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Project Date</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Status</th>
            <th className="px-5 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wide">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {rows.map((row, index) => (
            <ProjectRow
              key={row.sNo}
              row={row}
              index={index}
              onChange={onChange}
              onAddRow={onAddRow}
              onDeleteRow={onDeleteRow}
              rowError={rowErrors && rowErrors[index] ? rowErrors[index] : {}}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
