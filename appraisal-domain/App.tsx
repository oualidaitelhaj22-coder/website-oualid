
import React, { useState, useEffect } from 'react';
import type { Theme, PageType, ToolTabType, User } from './types';
import Header from './components/Header';
import Tabs from './components/Tabs';
import DomainAppraisal from './components/DomainAppraisal';
import DomainGenerator from './components/DomainGenerator';
import DomainExtractor from './components/DomainExtractor';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import SignUp from './components/SignUp';


const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [activePage, setActivePage] = useState<PageType>('appraisal');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Check for logged-in user in localStorage on initial load
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('currentUser');
    }
  }, []);
  
  const handleLogin = (user: User) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setActivePage('appraisal'); // Redirect to home after login
  };

  const handleSignUp = (user: User) => {
     // In a real app, you'd check if the user exists before creating a new one.
     // For this simulation, we'll just store the new user.
    localStorage.setItem('user_account', JSON.stringify(user)); // Mock user database
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setActivePage('appraisal'); // Redirect to home after signup
  };

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setActivePage('appraisal'); // Redirect to home after signout
  };


  const isToolPage = (page: PageType): page is ToolTabType => {
      return ['appraisal', 'generator', 'extractor'].includes(page);
  }

  const renderPage = () => {
    switch (activePage) {
      case 'appraisal':
        return <DomainAppraisal />;
      case 'generator':
        return <DomainGenerator />;
      case 'extractor':
        return <DomainExtractor />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      case 'login':
        return <Login onLogin={handleLogin} setActivePage={setActivePage} />;
      case 'signup':
        return <SignUp onSignUp={handleSignUp} setActivePage={setActivePage} />;
      default:
        return <DomainAppraisal />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans">
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        activePage={activePage} 
        setActivePage={setActivePage}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {isToolPage(activePage) && (
              <Tabs activeTab={activePage} setActiveTab={(tab) => setActivePage(tab)} />
          )}
          <div className={`bg-white dark:bg-slate-800/50 rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 dark:border-slate-700 ${isToolPage(activePage) ? 'mt-8' : ''}`}>
            {renderPage()}
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} APPRAISAL DOMAIN BY OUALID AIT EL HAJ</p>
      </footer>
    </div>
  );
};

export default App;