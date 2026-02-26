import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Assignment fixed credentials
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "1234";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // 1. Set authentication flag
      localStorage.setItem('isAuthenticated', 'true');
      
      // 2. Redirect to the exact path defined in App.jsx
      navigate('/admin/dashboard'); 
    } else {
      setError('Invalid credentials. Hint: Please use The Admin Email');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9f6] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-emerald-50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-emerald-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif text-slate-800 italic">Admin Login</h2>
          <p className="text-gray-500 text-sm mt-2">Vighnaharta Infinity Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#91c141] outline-none transition-all"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#91c141] outline-none transition-all"
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#91c141] hover:bg-[#7ba536] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-emerald-100"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}