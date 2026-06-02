import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error message

    // Validate credentials
    if (username === 'admin' && password === 'password') {
      setIsLoading(true);
      
      // Simulate signing in for a short duration
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      }, 1200); // short loading state duration (1.2 seconds)
    } else {
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      {/* Visual Floating Login Card */}
      <div className="group max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-indigo-50/80 hover:-translate-y-0.5 transition-all duration-500 select-none animate-fade-in">
        
        {/* Branding Section */}
        <div className="text-center space-y-4 mb-8">
          {/* Logo Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-indigo-100 group-hover:rotate-6 transition-transform duration-300">
            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              User Directory
            </h2>
            <h3 className="text-lg font-bold text-indigo-900/80">
              Welcome Back
            </h3>
            <p className="text-xs font-semibold text-slate-400 max-w-[260px] mx-auto leading-relaxed">
              Sign in to continue to your dashboard
            </p>
          </div>
        </div>

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            
            {/* Username Input Container */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                Username
              </label>
              <div className="relative shadow-sm rounded-xl">
                <input
                  id="username"
                  type="text"
                  required
                  disabled={isLoading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-white/90 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Input Container */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                Password
              </label>
              <div className="relative shadow-sm rounded-xl">
                <input
                  id="password"
                  type="password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/90 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 text-sm font-extrabold text-white uppercase tracking-wider bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200/80 transition-all duration-300 ${
              isLoading 
                ? 'opacity-75 cursor-not-allowed' 
                : 'hover:scale-[1.01] hover:-translate-y-0.5 active:translate-y-0 active:scale-100 cursor-pointer'
            }`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Display error message below the form */}
        {error && (
          <div className="mt-4 text-xs font-semibold text-rose-500 bg-rose-50/50 border border-rose-100 rounded-xl p-3 text-center animate-fade-in">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
