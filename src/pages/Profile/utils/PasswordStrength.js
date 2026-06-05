export const getPasswordStrength = (password) => {
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
