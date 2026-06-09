import { useForm } from 'react-hook-form';

const STATUS_OPTIONS = ['Planning', 'In Progress', 'On Hold', 'Completed'];

// Input class helper
const inputClass = (hasError) =>
  `w-full rounded-xl border py-2.5 px-3.5 text-sm text-slate-800 outline-none transition-all duration-200 ${
    hasError
      ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100'
      : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
  }`;

// Field error component
const FieldError = ({ message }) =>
  message ? (
    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
      <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </p>
  ) : null;

const ProjectFormModal = ({ mode, project, onClose, onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: project?.name ?? '',
      shortCode: project?.shortCode ?? '',
      projectDate: project?.projectDate ?? '',
      status: project?.status ?? 'Planning',
      description: project?.description ?? '',
    },
  });

  const isEdit = mode === 'edit';
  const title = isEdit ? 'Edit Project' : 'Create New Project';
  const subtitle = isEdit
    ? 'Update the project details below.'
    : 'Fill in the project details below to add it to your pipeline.';

  const handleDiscard = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={handleDiscard}
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={handleDiscard}
            aria-label="Close"
            className="ml-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4 px-6 py-5">
            {/* Row 1 — Name + Short Code */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Workforce Hub"
                  className={inputClass(!!errors.name)}
                  {...register('name', {
                    required: 'Project Name is required',
                    minLength: { value: 2, message: 'Must be at least 2 characters' },
                  })}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Short Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. WH01"
                  className={inputClass(!!errors.shortCode)}
                  {...register('shortCode', {
                    required: 'Short Code is required',
                    maxLength: { value: 10, message: 'Max 10 characters' },
                    pattern: {
                      value: /^[A-Za-z0-9-_]+$/,
                      message: 'Only letters, numbers, - and _ allowed',
                    },
                  })}
                />
                <FieldError message={errors.shortCode?.message} />
              </div>
            </div>

            {/* Row 2 — Date + Status */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Project Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className={inputClass(!!errors.projectDate)}
                  {...register('projectDate', {
                    required: 'Project Date is required',
                  })}
                />
                <FieldError message={errors.projectDate?.message} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </label>
                <select
                  className={inputClass(false)}
                  {...register('status')}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Brief summary of the project goals and deliverables..."
                className={`${inputClass(false)} resize-none`}
                {...register('description')}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
            <button
              type="button"
              onClick={handleDiscard}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors duration-200"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 disabled:opacity-60 transition-colors duration-200"
            >
              {isSubmitting && (
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isEdit ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
