import { useContext, useMemo, useState } from 'react';
import { UserContext } from '../../context/UserContextValue';
import { getAdminProfile } from '../../utils/auth';
import { TABS, LOGIN_HISTORY, RECENT_ACTIONS } from './utils/profileConstants';
import ProfileTabs from './components/ProfileTabs';
import ProfileForm from './components/ProfileForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import LoginHistory from './components/LoginHistory';
import RecentActivity from './components/RecentActivity';

const Profile = () => {
  const { adminProfile, updateAdminProfileState } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('profile');

  const profile = adminProfile || getAdminProfile();
  const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Admin User';

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
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">Profile</p>
        <h2 className="mt-2 text-[30px] font-bold tracking-tight text-slate-800">{fullName}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">{profile.email}</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          {profile.role} | {profile.employeeCode}
        </p>
      </section>

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} />

      {activeTab === 'profile' && (
        <ProfileForm profile={profile} updateAdminProfileState={updateAdminProfileState} />
      )}

      {activeTab === 'password' && <ChangePasswordForm />}

      {activeTab === 'activity' && (
        <div className="space-y-6">
          <LoginHistory loginHistory={LOGIN_HISTORY} />
          <RecentActivity recentActions={RECENT_ACTIONS} sessionDetails={sessionDetails} />
        </div>
      )}
    </div>
  );
};

export default Profile;
