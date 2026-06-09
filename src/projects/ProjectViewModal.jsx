const StatusBadge = ({ status }) => {
  const styles = {
    'In Progress': 'bg-amber-50 text-amber-700 border border-amber-200',
    Completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Planning: 'bg-blue-50 text-blue-700 border border-blue-200',
    'On Hold': 'bg-rose-50 text-rose-700 border border-rose-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        styles[status] ?? 'bg-slate-50 text-slate-700 border border-slate-200'
      }`}
    >
      {status}
    </span>
  );
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const ProjectViewModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {project.shortCode}
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-800 truncate">{project.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Date</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{formatDate(project.projectDate)}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</p>
              <div className="mt-1">
                <StatusBadge status={project.status} />
              </div>
            </div>
          </div>

          {project.description && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{project.description}</p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewModal;
