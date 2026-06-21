import { useForm } from 'react-hook-form';

const ProfileForm = ({ profile }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      employeeCode: profile.employeeCode || '',
      email: profile.email || '',
      username: profile.username || 'admin',
      role: profile.role || 'Administrator',
      phone: profile.phone || '',
      lastLogin: profile.lastLogin || '',
    },
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-[20px] font-semibold text-slate-800">Profile Information</h3>
      <p className="mt-1 text-sm font-medium text-slate-500">
        Update your administrator details.
      </p>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
        Profile update functionality is currently unavailable.
      </div>

      <form onSubmit={(event) => event.preventDefault()} className="mt-6 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="profile-first-name" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              First Name
            </label>
            <input
              id="profile-first-name"
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.firstName && <p className="mt-2 text-xs font-semibold text-red-600">{errors.firstName.message}</p>}
          </div>

          <div>
            <label htmlFor="profile-last-name" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              Last Name
            </label>
            <input
              id="profile-last-name"
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.lastName && <p className="mt-2 text-xs font-semibold text-red-600">{errors.lastName.message}</p>}
          </div>

          <div>
            <label htmlFor="profile-username" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              Username
            </label>
            <input
              id="profile-username"
              type="text"
              {...register('username', { required: 'Username is required' })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.username && <p className="mt-2 text-xs font-semibold text-red-600">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="profile-email" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              Email Address
            </label>
            <input
              id="profile-email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.email && <p className="mt-2 text-xs font-semibold text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="profile-role" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              Role
            </label>
            <input
              id="profile-role"
              type="text"
              {...register('role')}
              readOnly
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-[15px] font-medium text-slate-500 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label htmlFor="profile-phone" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              Phone
            </label>
            <input
              id="profile-phone"
              type="text"
              {...register('phone')}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="profile-employee-code" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              Employee Code
            </label>
            <input
              id="profile-employee-code"
              type="text"
              {...register('employeeCode')}
              readOnly
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-[15px] font-medium text-slate-500 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label htmlFor="profile-last-login" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              Last Login
            </label>
            <input
              id="profile-last-login"
              type="text"
              {...register('lastLogin')}
              readOnly
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-[15px] font-medium text-slate-500 cursor-not-allowed outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
