import EmployeeRow from './EmployeeRow';

const EmployeeTable = ({ rows, onChange, onAddRow, onDeleteRow, rowErrors }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full border-collapse">
        <thead className="bg-slate-100 border-b border-slate-200">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">S.No</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Employee Name</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Mobile Number</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Date of Birth</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Relation Type</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Profession</th>
            <th className="px-5 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wide">Emergency Contact</th>
            <th className="px-5 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wide">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {rows.map((row) => (
            <EmployeeRow
              key={row.sNo}
              row={row}
              index={row.sNo}
              onChange={onChange}
              onAddRow={onAddRow}
              onDeleteRow={onDeleteRow}
              rowError={rowErrors && rowErrors[row.sNo] ? rowErrors[row.sNo] : {}}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
