
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="animate-fade-in text-slate-600 dark:text-slate-300">
      <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-6">About Us</h2>
      
      <div className="space-y-6 text-lg max-w-3xl mx-auto leading-relaxed">
        <p className="text-center text-xl font-light">
          Welcome to my website❤️ I’m OUALID, passionate about technology and design. I work on developing digital projects that combine creativity and simplicity. I love continuous learning and sharing knowledge with others, and I always strive to provide valuable and inspiring content that truly benefits my visitors.
        </p>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
             <h3 className="text-2xl font-semibold text-center text-slate-700 dark:text-slate-200 mb-4">Our Vision</h3>
             <p>
                At APPRAISAL DOMAIN, our mission is to empower entrepreneurs, investors, and creatives by providing intelligent, data-driven tools for the world of domain names. We believe that the right domain is the cornerstone of a successful online presence, and we're here to make finding it easier and more insightful than ever before.
            </p>
        </div>

        <div>
            <h3 className="text-2xl font-semibold text-center text-slate-700 dark:text-slate-200 mb-4">What We Offer</h3>
            <ul className="space-y-4">
                <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-3 mt-1">✓</span>
                    <div>
                        <strong className="font-semibold text-slate-700 dark:text-slate-200">AI-Powered Domain Appraisal:</strong> Get an instant, AI-generated valuation for any domain, complete with comparable sales data, brandability scores, and SEO insights to understand its true market potential.
                    </div>
                </li>
                <li className="flex items-start">
                     <span className="text-blue-500 font-bold mr-3 mt-1">✓</span>
                    <div>
                        <strong className="font-semibold text-slate-700 dark:text-slate-200">Creative Name Generator:</strong> Break through creative blocks with our AI Name Generator. Simply enter a keyword, and we'll provide a list of unique, catchy, and available domain ideas tailored to your needs.
                    </div>
                </li>
                <li className="flex items-start">
                     <span className="text-blue-500 font-bold mr-3 mt-1">✓</span>
                    <div>
                        <strong className="font-semibold text-slate-700 dark:text-slate-200">Smart Keyword Extractor:</strong> Discover hidden opportunities by seeing what domains are registered with your keyword across major TLDs. A perfect tool for market research and identifying trends.
                    </div>
                </li>
            </ul>
        </div>
        
        <p className="text-center pt-6 border-t border-slate-200 dark:border-slate-700">
          Powered by cutting-edge AI from Google Gemini, this platform is designed to be your intelligent partner in the digital landscape.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
