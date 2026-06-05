const ProfileTabs = ({ activeTab, onTabChange, tabs }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
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
);

export default ProfileTabs;
