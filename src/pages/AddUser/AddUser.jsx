import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUsers } from '../../hooks/useUsers';

const fields = [
  {
    name: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter full name',
    type: 'text',
    required: 'Full name is required',
  },
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter username',
    type: 'text',
    required: 'Username is required',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter email address',
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
    placeholder: 'Enter phone number',
    type: 'tel',
    required: 'Phone number is required',
  },
  {
    name: 'website',
    label: 'Website',
    placeholder: 'Enter website',
    type: 'text',
    required: 'Website is required',
  },
  {
    name: 'company',
    label: 'Company',
    placeholder: 'Enter company',
    type: 'text',
    required: 'Company is required',
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter address',
    type: 'text',
    required: 'Address is required',
  },
];

const AddUser = () => {
  const { addedUsers, addUser } = useUsers();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: '',
      address: '',
    },
  });

  const onSubmit = (values) => {
    addUser(values);
    reset();
    setSuccessMessage(`${values.fullName} was added to the user table.`);
    setTimeout(() => {
      navigate('/users');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
          Add User
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-800">
          Create Directory User
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
          Add a local user record for the current admin session. No backend is required.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className={field.name === 'address' ? 'md:col-span-2' : ''}>
                <label htmlFor={field.name} className="text-sm font-bold text-slate-700">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  {...register(field.name, {
                    required: field.required,
                    pattern: field.pattern,
                  })}
                  placeholder={field.placeholder}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all duration-300 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors[field.name] && (
                  <p className="mt-2 text-xs font-semibold text-red-600">{errors[field.name].message}</p>
                )}
              </div>
            ))}
          </div>

          {successMessage && (
            <p role="status" className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
              {successMessage}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:w-auto"
            >
              Save User
            </button>
          </div>
        </form>

        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Added Users</p>
          <h3 className="mt-2 text-3xl font-black text-slate-800">{addedUsers.length}</h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Local records added during this session.
          </p>

          <div className="mt-5 space-y-3">
            {addedUsers.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">
                No local users added yet.
              </p>
            ) : (
              addedUsers.slice(-4).reverse().map((user) => (
                <div key={user.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs font-semibold text-slate-500">@{user.username}</p>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AddUser;
