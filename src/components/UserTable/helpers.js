export const getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const getAccent = () => ({
  border: 'border-l-4 border-l-blue-600 group-hover:border-l-blue-700',
  avatar: 'bg-blue-600',
});
