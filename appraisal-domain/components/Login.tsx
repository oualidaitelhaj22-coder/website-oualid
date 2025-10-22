
import React, { useState } from 'react';
import type { PageType, User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  setActivePage: (page: PageType) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, setActivePage }) => {
  const [view, setView] = useState<'login' | 'forgotPassword'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setConfirmation(null);
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    // This is a simulated login. In a real app, you would verify credentials against a backend.
    try {
        const storedUser = localStorage.getItem('user_account');
        if (storedUser) {
            const userAccount: User = JSON.parse(storedUser);
            if (userAccount.email.toLowerCase() === email.toLowerCase()) {
                // Password check is skipped in this simulation.
                onLogin(userAccount);
            } else {
                setError('Invalid credentials.');
            }
        } else {
            setError('No account found. Please sign up.');
        }
    } catch (err) {
        setError('An error occurred. Please try again.');
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setConfirmation(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Simulate sending the email
    setConfirmation('If an account with that email exists, a password reset link has been sent.');
    setEmail(''); // Clear the input field
  };
  
  const resetState = () => {
      setError(null);
      setConfirmation(null);
      setEmail('');
      setPassword('');
  }

  if (view === 'forgotPassword') {
    return (
      <div className="animate-fade-in max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-4">Reset Password</h2>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">Enter your email and we'll send you a link to get back into your account.</p>
        <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
          <div>
            <label htmlFor="email-forgot" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Email Address</label>
            <div className="mt-1">
              <input
                id="email-forgot"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>
          
          {error && <p className="text-center text-red-500 text-sm">{error}</p>}
          {confirmation && <p className="text-center text-green-600 dark:text-green-400 text-sm">{confirmation}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Remember your password?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); resetState(); }} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Back to Login
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-6">Login</h2>
      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Email Address</label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password"  className="block text-sm font-medium text-slate-600 dark:text-slate-300">Password</label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end text-sm">
          <a href="#" onClick={(e) => { e.preventDefault(); setView('forgotPassword'); resetState(); }} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Forgot your password?
          </a>
        </div>
        
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Don't have an account?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('signup'); }} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
