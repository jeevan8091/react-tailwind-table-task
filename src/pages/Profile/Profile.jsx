import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { fetchAdminInfo } from '../../redux/thunk/authThunk';
import ProfileTabs from './components/ProfileTabs';
import ProfileForm from './components/ProfileForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import LoginHistory from './components/LoginHistory';
import RecentActivity from './components/RecentActivity';
import { TABS, LOGIN_HISTORY, RECENT_ACTIONS } from './utils/profileConstants';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  // Defensive profile object
  const profile = user || {};

  // Auto‑fetch profile if not present and not already loading
  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchAdminInfo());
    }
  }, [user, loading, dispatch]);

  // Show error toast only when error changes
  useEffect(() => {
    if (error) {
      toast.error(error, { id: 'profile-error' });
    }
  }, [error]);

  const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.name || 'Admin User';
  const email = profile.email || 'Not Available';
  const phone = profile.phone || 'Not Available';
  const role = profile.role || 'Not Available';
  const lastLogin = profile.lastLogin || 'Not Available';

  const sessionDetails = useMemo(
    () => [
      { label: 'Browser', value: navigator.userAgent.split('(')[0]?.trim() || 'Unknown' },
      { label: 'Platform', value: navigator.platform || 'Unknown' },
      { label: 'Language', value: navigator.language || 'en-US' },
      { label: 'Session IP', value: LOGIN_HISTORY[0]?.ip || 'Unknown' },
    ],
    []
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-center text-gray-500">Loading Profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">Profile</p>
        <h2 className="mt-2 text-[30px] font-bold tracking-tight text-slate-800">{fullName}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">{email}</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">{role} | {profile.employeeCode || ''}</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">Phone: {phone}</p>
        <p className="mt-1 text-sm font-semibold text-slate-500">Last Login: {lastLogin}</p>
      </section>

      <ProfileTabs activeTab={profile.activeTab ?? 'profile'} onTabChange={() => {}} tabs={TABS} />

      {profile.activeTab === 'profile' && (
        <ProfileForm profile={profile} />
      )}

      {profile.activeTab === 'password' && <ChangePasswordForm />}

      {profile.activeTab === 'activity' && (
        <div className="space-y-6">
          <LoginHistory loginHistory={LOGIN_HISTORY} />
          <RecentActivity recentActions={RECENT_ACTIONS} sessionDetails={sessionDetails} />
        </div>
      )}
    </div>
  );
};

export default Profile;
