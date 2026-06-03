import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../../utils/auth';
import './Login.css';

const Login = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = ({ username, password }) => {
    const isLoggedIn = login({ username, password });

    if (!isLoggedIn) {
      setError('Invalid Username or Password');
      return;
    }

    setError('');
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl"></div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl shadow-slate-200/70 px-6 py-8 sm:px-8 sm:py-10 animate-fade-in">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Admin Portal
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-800">
              User Directory
            </h1>
            <h2 className="mt-5 text-xl font-bold text-slate-800">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="text-sm font-bold text-slate-700"
              >
                Username
              </label>

              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  placeholder="Enter your username"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all duration-300 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-xs font-semibold text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-bold text-slate-700"
              >
                Password
              </label>

              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-12 text-sm font-medium text-slate-800 placeholder:text-slate-400 transition-all duration-300 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus-visible:text-blue-600"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c1.674 0 3.257-.39 4.662-1.085M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.066 7.5a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.437 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs font-semibold text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label htmlFor="remember" className="flex items-center gap-2 font-medium text-slate-500">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                Remember Me
              </label>
              <a
                href="#forgot-password"
                className="font-bold text-blue-600 transition-colors duration-200 hover:text-indigo-600 focus:outline-none focus-visible:underline"
              >
                Forgot Password?
              </a>
            </div>

            {error && (
              <p role="alert" className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
