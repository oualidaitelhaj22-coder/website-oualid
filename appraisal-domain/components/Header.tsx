
import React from 'react';
import type { Theme, PageType, User } from '../types';
import { SunIcon, MoonIcon } from './icons';

interface HeaderProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  currentUser: User | null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme, activePage, setActivePage, currentUser, onSignOut }) => {
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navLinks: { id: PageType; label: string }[] = [
    { id: 'appraisal', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side: Title */}
        <div className="flex-shrink-0">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActivePage('appraisal'); }}
            className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-80 transition-opacity"
          >
            APPRAISAL DOMAIN
          </a>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a
              key={link.id}
              href="#"
              onClick={(e) => { e.preventDefault(); setActivePage(link.id); }}
              className={`text-sm font-medium transition-colors ${
                (link.id === 'appraisal' ? ['appraisal', 'generator', 'extractor'].includes(activePage) : activePage === link.id)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side: Auth & Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {currentUser ? (
            <>
              <span className="hidden sm:inline text-sm text-slate-600 dark:text-slate-300">
                Welcome, <span className="font-semibold">{currentUser.name.split(' ')[0]}</span>
              </span>
              <button
                onClick={onSignOut}
                className="px-3 py-1.5 text-sm font-semibold rounded-md text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActivePage('login')}
                className="px-3 py-1.5 text-sm font-semibold rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => setActivePage('signup')}
                className="px-3 py-1.5 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
          <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900"
              aria-label="Toggle theme"
          >
              {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;