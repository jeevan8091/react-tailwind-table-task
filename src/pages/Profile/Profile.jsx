import { useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/UserContextValue';
import {
  checkAdminPassword,
  getAdminProfile,
  updateAdminPassword,
  updateAdminProfile,
} from '../../utils/auth';

const TABS = [
  { key: 'profile', label: 'Profile' },
  { key: 'password', label: 'Password' },
  { key: 'activity', label: 'Account Activity' },
];

const LOGIN_HISTORY = [
  { time: '2026-06-04 16:30', ip: '192.168.1.45', device: 'Chrome 126 / Windows 11', status: 'Success' },
  { time: '2026-06-04 09:15', ip: '192.168.1.45', device: 'Chrome 126 / Windows 11', status: 'Success' },
  { time: '2026-06-03 14:02', ip: '10.0.0.12', device: 'Firefox 127 / macOS', status: 'Success' },
  { time: '2026-06-02 18:45', ip: '203.56.12.8', device: 'Chrome 125 / Android', status: 'Failed' },
];

const RECENT_ACTIONS = [
  { action: 'Updated profile information', time: '2 hours ago' },
  { action: 'Changed password', time: '1 day ago' },
  { action: 'Added new user to directory', time: '2 days ago' },
  { action: 'Exported user list to CSV', time: '3 days ago' },
];

const getPasswordStrength = (password) => {
  if (!password) {
    return {
      label: 'Enter a new password',
      tone: 'text-slate-400',
      bar: 'bg-slate-200',
      width: 'w-0',
      isStrong: false,
    };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return {
      label: 'Weak password',
      tone: 'text-red-600',
      bar: 'bg-red-500',
      width: 'w-1/3',
      isStrong: false,
    };
  }

  if (score <= 4) {
    return {
      label: 'Moderate password',
      tone: 'text-amber-600',
      bar: 'bg-amber-500',
      width: 'w-2/3',
      isStrong: false,
    };
  }

  return {
    label: 'Strong password',
    tone: 'text-emerald-600',
    bar: 'bg-emerald-500',
    width: 'w-full',
    isStrong: true,
  };
};

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

const Profile = () => {
  const { adminProfile, updateAdminProfileState } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileMsg, setProfileMsg] = useState('');
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

  const profile = adminProfile || getAdminProfile();
  const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Admin User';

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      employeeCode: profile.employeeCode,
      email: profile.email,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSave = (data) => {
    const updatedProfile = { ...profile, ...data };
    updateAdminProfile(updatedProfile);
    updateAdminProfileState(updatedProfile);
    setProfileMsg('Profile information updated successfully.');
    setTimeout(() => setProfileMsg(''), 3500);
  };

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
    resetPassword();
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

  const sessionDetails = useMemo(
    () => [
      { label: 'Browser', value: navigator.userAgent.split('(')[0]?.trim() || 'Unknown' },
      { label: 'Platform', value: navigator.platform || 'Unknown' },
      { label: 'Language', value: navigator.language || 'en-US' },
      { label: 'Session IP', value: LOGIN_HISTORY[0]?.ip || 'Unknown' },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">
          Profile
        </p>
        <h2 className="mt-2 text-[30px] font-bold tracking-tight text-slate-800">
          {fullName}
        </h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">{profile.email}</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          {profile.role} | {profile.employeeCode}
        </p>
      </section>

      <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
        <nav className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={[
                'rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200',
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {profileMsg && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
          {profileMsg}
        </div>
      )}

      {passwordMsg.text && (
        <div
          className={[
            'rounded-2xl px-4 py-3 text-sm font-semibold',
            passwordMsg.type === 'success'
              ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
              : 'border border-red-100 bg-red-50 text-red-700',
          ].join(' ')}
        >
          {passwordMsg.text}
        </div>
      )}

      {activeTab === 'profile' && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-[20px] font-semibold text-slate-800">Profile Information</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Update your administrator details.
          </p>

          <form onSubmit={handleProfileSubmit(onProfileSave)} className="mt-6 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="profile-first-name" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
                  First Name
                </label>
                <input
                  id="profile-first-name"
                  type="text"
                  {...registerProfile('firstName', { required: 'First name is required' })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {profileErrors.firstName && <p className="mt-2 text-xs font-semibold text-red-600">{profileErrors.firstName.message}</p>}
              </div>

              <div>
                <label htmlFor="profile-last-name" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
                  Last Name
                </label>
                <input
                  id="profile-last-name"
                  type="text"
                  {...registerProfile('lastName', { required: 'Last name is required' })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {profileErrors.lastName && <p className="mt-2 text-xs font-semibold text-red-600">{profileErrors.lastName.message}</p>}
              </div>

              <div>
                <label htmlFor="profile-employee-code" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
                  Employee Code
                </label>
                <input
                  id="profile-employee-code"
                  type="text"
                  {...registerProfile('employeeCode', { required: 'Employee code is required' })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {profileErrors.employeeCode && <p className="mt-2 text-xs font-semibold text-red-600">{profileErrors.employeeCode.message}</p>}
              </div>

              <div>
                <label htmlFor="profile-email" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
                  Email Address
                </label>
                <input
                  id="profile-email"
                  type="email"
                  {...registerProfile('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] font-medium text-slate-800 transition-all duration-200 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {profileErrors.email && <p className="mt-2 text-xs font-semibold text-red-600">{profileErrors.email.message}</p>}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>
      )}

      {activeTab === 'password' && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-[20px] font-semibold text-slate-800">Password</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Update your sign-in credentials.
          </p>

          <form onSubmit={handlePasswordSubmit(onPasswordSave)} className="mt-6 space-y-5">
            <div className="grid gap-5 lg:grid-cols-3">
              <div>
                <label htmlFor="current-password" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
                  Current Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="current-password"
                    type={showPasswords.currentPassword ? 'text' : 'password'}
                    {...registerPassword('currentPassword', { required: 'Current password is required' })}
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
                {passwordErrors.currentPassword && <p className="mt-2 text-xs font-semibold text-red-600">{passwordErrors.currentPassword.message}</p>}
              </div>

              <div>
                <label htmlFor="new-password" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
                  New Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="new-password"
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    {...registerPassword('newPassword', {
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
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.bar} ${passwordStrength.width}`}
                    />
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
                {passwordErrors.newPassword && <p className="mt-2 text-xs font-semibold text-red-600">{passwordErrors.newPassword.message}</p>}
              </div>

              <div>
                <label htmlFor="confirm-password" className="text-[13px] font-semibold tracking-[0.04em] text-slate-500">
                  Confirm Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="confirm-password"
                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                    {...registerPassword('confirmPassword', {
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
                {passwordErrors.confirmPassword && <p className="mt-2 text-xs font-semibold text-red-600">{passwordErrors.confirmPassword.message}</p>}
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
      )}

      {activeTab === 'activity' && (
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-[20px] font-semibold text-slate-800">Last Login</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Date & Time', value: LOGIN_HISTORY[0]?.time || 'N/A' },
                { label: 'IP Address', value: LOGIN_HISTORY[0]?.ip || 'N/A' },
                { label: 'Device', value: LOGIN_HISTORY[0]?.device || 'N/A' },
                { label: 'Status', value: LOGIN_HISTORY[0]?.status || 'N/A' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-[20px] font-semibold text-slate-800">Login History</h3>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Time</th>
                    <th className="py-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">IP Address</th>
                    <th className="py-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Device</th>
                    <th className="py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {LOGIN_HISTORY.map((entry) => (
                    <tr key={`${entry.time}-${entry.ip}`} className="border-b border-slate-50 last:border-0">
                      <td className="py-3 pr-4 font-semibold text-slate-700">{entry.time}</td>
                      <td className="py-3 pr-4 font-mono text-xs font-semibold text-slate-500">{entry.ip}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-700">{entry.device}</td>
                      <td className="py-3">
                        <span
                          className={[
                            'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
                            entry.status === 'Success'
                              ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                              : 'border border-red-100 bg-red-50 text-red-700',
                          ].join(' ')}
                        >
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-[20px] font-semibold text-slate-800">Recent Actions</h3>
              <div className="mt-5 space-y-3">
                {RECENT_ACTIONS.map((item) => (
                  <div key={`${item.action}-${item.time}`} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-800">{item.action}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{item.time}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-[20px] font-semibold text-slate-800">Session Information</h3>
              <div className="mt-5 space-y-4">
                {sessionDetails.map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm font-semibold text-slate-500">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
