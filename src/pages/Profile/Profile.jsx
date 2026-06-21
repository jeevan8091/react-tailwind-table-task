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
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-center text-gray-500">Loading Profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-semibold text-blue-600">Profile</p>
        <h2 className="mt-1 text-3xl font-bold text-slate-800">{fullName}</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-500 font-normal">
          <p><span className="font-semibold text-slate-700">Email:</span> {email}</p>
          <p><span className="font-semibold text-slate-700">Role:</span> {role} {profile.employeeCode ? `| ${profile.employeeCode}` : ''}</p>
          <p><span className="font-semibold text-slate-700">Phone:</span> {phone}</p>
          <p className="md:col-span-2 lg:col-span-3"><span className="font-semibold text-slate-700">Last Login:</span> {lastLogin}</p>
        </div>
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
