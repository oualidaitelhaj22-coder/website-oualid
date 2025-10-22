
import React, { useState } from 'react';
import type { PageType, User } from '../types';

interface SignUpProps {
  onSignUp: (user: User) => void;
  setActivePage: (page: PageType) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, setActivePage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // In a real app, you would perform more validation here.
    onSignUp({ name, email });
  };

  return (
    <div className="animate-fade-in max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-6">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Full Name</label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email-signup" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Email Address</label>
          <div className="mt-1">
            <input
              id="email-signup"
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
          <label htmlFor="password-signup" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Password</label>
          <div className="mt-1">
            <input
              id="password-signup"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>
        
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('login'); }} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
          Login
        </a>
      </p>
    </div>
  );
};

export default SignUp;
