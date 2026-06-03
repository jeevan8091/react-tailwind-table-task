import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/auth';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isLoggedIn = login({ username, password });

    if (!isLoggedIn) {
      setError('Invalid Username or Password');
      return;
    }

    setError('');
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      <div className="group max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-indigo-50/80 hover:-translate-y-0.5 transition-all duration-500">

        {/* Branding */}
        <div className="text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-indigo-100">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              User Directory
            </h2>

            <h3 className="text-lg font-bold text-indigo-900/80">
              Welcome Back
            </h3>

            <p className="text-xs font-semibold text-slate-400 mt-2">
              Sign in to continue to your dashboard
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="text-xs font-bold text-slate-400 uppercase tracking-wider"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-2 w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-xs font-bold text-slate-400 uppercase tracking-wider"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
