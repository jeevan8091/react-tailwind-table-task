export const getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700 border border-blue-200',
  'bg-indigo-100 text-indigo-700 border border-indigo-200',
  'bg-purple-100 text-purple-700 border border-purple-200',
  'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'bg-rose-100 text-rose-700 border border-rose-200',
  'bg-amber-100 text-amber-700 border border-amber-200',
];

export const getAvatarColor = (id) => {
  const numId = typeof id === 'number' ? id : parseInt(String(id).replace(/\D/g, '')) || 0;
  return AVATAR_COLORS[numId % AVATAR_COLORS.length];
};

export const getStatus = (id) => {
  const numId = typeof id === 'number' ? id : parseInt(String(id).replace(/\D/g, '')) || 0;
  const statuses = ['Active', 'Pending', 'Inactive'];
  return statuses[numId % 3];
};

export const getAccent = () => ({
  border: 'border-l-4 border-l-blue-600 group-hover:border-l-blue-700',
  avatar: 'bg-blue-600',
});
