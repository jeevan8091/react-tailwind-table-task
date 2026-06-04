import { useForm } from 'react-hook-form';

const fields = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: 'Full name is required',
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: 'Username is required',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address',
    },
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: 'Phone number is required',
  },
  {
    name: 'website',
    label: 'Website',
    type: 'text',
    required: 'Website is required',
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    required: 'Company is required',
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    required: 'Address is required',
  },
];

const getFormValues = (user) => ({
  name: user?.name ?? '',
  username: user?.username ?? '',
  email: user?.email ?? '',
  phone: user?.phone ?? '',
  website: user?.website ?? '',
  company: user?.company?.name ?? '',
  address: [user?.address?.street, user?.address?.suite, user?.address?.city]
    .filter(Boolean)
    .join(', '),
});

const EditUserModal = ({ user, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: getFormValues(user),
  });
  const handleSave = (values) => {
    onSave({
      ...user,
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      website: values.website,
      company: {
        ...(user.company ?? {}),
        name: values.company,
      },
      address: {
        ...(user.address ?? {}),
        street: values.address,
        suite: '',
        city: '',
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">Edit User</p>
            <h2 className="mt-1 text-[20px] font-semibold text-slate-800">Update directory details</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="px-5 py-5 sm:px-6">
          <div className="grid max-h-[60vh] gap-5 overflow-y-auto pr-1 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className={field.name === 'address' ? 'md:col-span-2' : ''}>
                <label htmlFor={`edit-${field.name}`} className="text-[13px] font-semibold tracking-[0.01em] text-slate-700">
                  {field.label}
                </label>
                <input
                  id={`edit-${field.name}`}
                  type={field.type}
                  {...register(field.name, {
                    required: field.required,
                    pattern: field.pattern,
                  })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 placeholder:text-slate-400 transition-all duration-300 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors[field.name] && (
                  <p className="mt-2 text-xs font-semibold text-red-600">{errors[field.name].message}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
