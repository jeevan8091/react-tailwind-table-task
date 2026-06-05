import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { checkAdminPassword, updateAdminPassword } from '../../../utils/auth';
import { getPasswordStrength } from '../utils/PasswordStrength';

const EyeIcon = ({ open }) => (
  open ? (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c1.674 0 3.257-.39 4.662-1.085M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.066 7.5a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.437 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
);

const ChangePasswordForm = () => {
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [passwordValues, setPasswordValues] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onPasswordSave = (data) => {
    setPasswordMsg({ type: '', text: '' });

    if (!checkAdminPassword(data.currentPassword)) {
      setPasswordMsg({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    const strength = getPasswordStrength(data.newPassword);
    if (!strength.isStrong) {
      setPasswordMsg({
        type: 'error',
        text: 'Use at least 8 characters with uppercase, lowercase, number, and special character.',
      });
      return;
    }

    updateAdminPassword(data.newPassword);
    reset();
    setPasswordValues({ newPassword: '', confirmPassword: '' });
    setShowPasswords({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
    setPasswordMsg({ type: 'success', text: 'Password updated successfully.' });
    setTimeout(() => setPasswordMsg({ type: '', text: '' }), 3500);
  };

  const newPasswordValue = passwordValues.newPassword;
  const confirmPasswordValue = passwordValues.confirmPassword;
  const passwordStrength = getPasswordStrength(newPasswordValue);
  const confirmMatches = confirmPasswordValue && newPasswordValue === confirmPasswordValue;

  const togglePasswordVisibility = (field) => {
    setShowPasswords((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-[20px] font-semibold text-slate-800">Password</h3>
      <p className="mt-1 text-sm font-medium text-slate-500">
        Update your sign-in credentials.
      </p>

      {passwordMsg.text && (
        <div
          className={[
            'mt-6 rounded-2xl px-4 py-3 text-sm font-semibold',
            passwordMsg.type === 'success'
              ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
              : 'border border-red-100 bg-red-50 text-red-700',
          ].join(' ')}
        >
          {passwordMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onPasswordSave)} className="mt-6 space-y-5">
        <div className="grid gap-5 lg:grid-cols-3">
          <div>
            <label htmlFor="current-password" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              Current Password
            </label>
            <div className="relative mt-2">
              <input
                id="current-password"
                type={showPasswords.currentPassword ? 'text' : 'password'}
                {...register('currentPassword', { required: 'Current password is required' })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('currentPassword')}
                aria-label={showPasswords.currentPassword ? 'Hide current password' : 'Show current password'}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus-visible:text-blue-600"
              >
                <EyeIcon open={showPasswords.currentPassword} />
              </button>
            </div>
            {errors.currentPassword && <p className="mt-2 text-xs font-semibold text-red-600">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="new-password" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              New Password
            </label>
            <div className="relative mt-2">
              <input
                id="new-password"
                type={showPasswords.newPassword ? 'text' : 'password'}
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: {
                    value: 8,
                    message: 'Minimum 8 characters',
                  },
                  validate: {
                    hasUppercase: (value) => /[A-Z]/.test(value) || 'Include at least one uppercase letter',
                    hasLowercase: (value) => /[a-z]/.test(value) || 'Include at least one lowercase letter',
                    hasNumber: (value) => /\d/.test(value) || 'Include at least one number',
                    hasSpecial: (value) => /[^A-Za-z0-9]/.test(value) || 'Include at least one special character',
                  },
                  onChange: (event) => {
                    setPasswordValues((current) => ({
                      ...current,
                      newPassword: event.target.value,
                    }));
                  },
                })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                aria-label={showPasswords.newPassword ? 'Hide new password' : 'Show new password'}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus-visible:text-blue-600"
              >
                <EyeIcon open={showPasswords.newPassword} />
              </button>
            </div>
            <div className="mt-3">
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.bar} ${passwordStrength.width}`} />
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className={`text-xs font-semibold ${passwordStrength.tone}`}>
                  {passwordStrength.label}
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  8+ chars, upper, lower, number, special
                </p>
              </div>
            </div>
            {errors.newPassword && <p className="mt-2 text-xs font-semibold text-red-600">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="confirm-password" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
              Confirm Password
            </label>
            <div className="relative mt-2">
              <input
                id="confirm-password"
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Please confirm the new password',
                  validate: (value) => value === newPasswordValue || 'Passwords do not match',
                  onChange: (event) => {
                    setPasswordValues((current) => ({
                      ...current,
                      confirmPassword: event.target.value,
                    }));
                  },
                })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                aria-label={showPasswords.confirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus-visible:text-blue-600"
              >
                <EyeIcon open={showPasswords.confirmPassword} />
              </button>
            </div>
            {confirmPasswordValue && (
              <p className={`mt-2 text-xs font-semibold ${confirmMatches ? 'text-emerald-600' : 'text-red-600'}`}>
                {confirmMatches ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
            {errors.confirmPassword && <p className="mt-2 text-xs font-semibold text-red-600">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200"
          >
            Update Password
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePasswordForm;
