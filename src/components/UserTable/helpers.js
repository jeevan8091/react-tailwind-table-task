// ─── Helper: Extract initials from a full name ───────────────────────────────
export const getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// ─── Helper: Dynamic row border / avatar accent mapping ──────────────────────
export const getAccent = (id) => {
  const accentCycle = id % 5;
  const styles = [
    {
      border: 'border-l-4 border-l-blue-500 group-hover:border-l-blue-600',
      text: 'text-blue-600',
      glow: 'group-hover:shadow-blue-50/50 group-hover:shadow-md',
      avatar: 'bg-gradient-to-tr from-blue-500 to-indigo-600',
    },
    {
      border: 'border-l-4 border-l-emerald-500 group-hover:border-l-emerald-600',
      text: 'text-emerald-600',
      glow: 'group-hover:shadow-emerald-50/50 group-hover:shadow-md',
      avatar: 'bg-gradient-to-tr from-emerald-500 to-teal-600',
    },
    {
      border: 'border-l-4 border-l-purple-500 group-hover:border-l-purple-600',
      text: 'text-purple-600',
      glow: 'group-hover:shadow-purple-50/50 group-hover:shadow-md',
      avatar: 'bg-gradient-to-tr from-purple-500 to-pink-600',
    },
    {
      border: 'border-l-4 border-l-orange-500 group-hover:border-l-orange-600',
      text: 'text-orange-600',
      glow: 'group-hover:shadow-orange-50/50 group-hover:shadow-md',
      avatar: 'bg-gradient-to-tr from-orange-500 to-amber-600',
    },
    {
      border: 'border-l-4 border-l-pink-500 group-hover:border-l-pink-600',
      text: 'text-pink-600',
      glow: 'group-hover:shadow-pink-50/50 group-hover:shadow-md',
      avatar: 'bg-gradient-to-tr from-pink-500 to-rose-600',
    },
  ];
  return styles[accentCycle];
};
