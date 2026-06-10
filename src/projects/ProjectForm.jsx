import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

// Helper to generate input class based on error state
const inputClass = (hasError) =>
  `w-full rounded-xl border py-2.5 px-3.5 text-sm text-slate-800 outline-none transition-all duration-200 ${
    hasError
      ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100'
      : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
  }`;

// Simple component to display field errors
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

// Reusable form used for both adding and editing a project
const ProjectForm = ({ mode = 'add', project = null, onSubmit, onCancel }) => {
  const isEdit = mode === 'edit';
  const navigate = useNavigate();

  const handleCancel = () => {
    reset();
    if (onCancel) {
      onCancel();
    } else {
      navigate('/projects');
    }
  };

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
    },
  });

  // Reset form when the supplied project changes (important for edit page)
  useEffect(() => {
    reset({
      name: project?.name ?? '',
      shortCode: project?.shortCode ?? '',
      projectDate: project?.projectDate ?? '',
      status: project?.status ?? 'Planning',
    });
  }, [project, reset]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = isEdit ? 'Edit Project' : 'Add Project';
  const submitLabel = isEdit ? 'Update Project' : 'Create Project';

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        {/* Row 1 – Name + Short Code */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Workforce Hub"
              className={inputClass(!!errors.name)}
              {...register('name', {
                required: 'Project Name is required',
                minLength: { value: 2, message: 'At least 2 characters' },
              })}
            />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
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

        {/* Row 2 – Date + Status */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Project Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={inputClass(!!errors.projectDate)}
              {...register('projectDate', { required: 'Project Date is required' })}
            />
            <FieldError message={errors.projectDate?.message} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Status</label>
            <select className={inputClass(!!errors.status)} {...register('status')}>
              {['Planning', 'In Progress', 'On Hold', 'Completed'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <FieldError message={errors.status?.message} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {isSubmitting && (
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
