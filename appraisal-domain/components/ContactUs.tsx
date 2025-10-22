
import React from 'react';
import { MailIcon, TwitterIcon, LinkedInIcon } from './icons';

const ContactUs: React.FC = () => {
  return (
    <div className="animate-fade-in text-slate-600 dark:text-slate-300">
      <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-6">Contact Us</h2>
      <p className="text-center text-lg max-w-2xl mx-auto mb-10">
        Have a question, feedback, or a partnership inquiry? We'd love to hear from you. Reach out through any of the channels below.
      </p>

      <div className="max-w-md mx-auto space-y-6">
        <a 
          href="mailto:mr.oualiddomainer@gmail.com" 
          className="flex items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
        >
          <MailIcon className="w-8 h-8 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
          <span className="ml-4 text-lg font-medium text-slate-700 dark:text-slate-200 break-all">mr.oualiddomainer@gmail.com</span>
        </a>
        
        <div className="flex justify-center space-x-6 pt-4">
             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">
                <TwitterIcon className="w-8 h-8" />
                <span className="sr-only">Twitter / X</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">
                <LinkedInIcon className="w-8 h-8" />
                 <span className="sr-only">LinkedIn</span>
            </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
