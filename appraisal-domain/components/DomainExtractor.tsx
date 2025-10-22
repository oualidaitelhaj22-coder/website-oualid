
import React, { useState } from 'react';
import type { ExtractedDomains } from '../types';
import { extractDomains } from '../services/geminiService';
import { LoadingSpinner, ListIcon } from './icons';

const DomainExtractor: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ExtractedDomains | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError('Please enter a keyword.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const domains = await extractDomains(keyword.trim());
      setResults(domains);
    } catch (err) {
      setError('Failed to extract domains. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">Smart Domain Extractor</h2>
      <p className="text-center text-slate-500 dark:text-slate-400 mt-2">Discover domains that contain your keyword.</p>
      
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g., coffee, block, chain"
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <LoadingSpinner /> : <ListIcon className="w-5 h-5 mr-2" />}
          {isLoading ? 'Extracting...' : 'Extract'}
        </button>
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      
      {isLoading && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-200 dark:bg-slate-700/50 rounded-lg h-48 animate-pulse-fast"></div>
            <div className="bg-slate-200 dark:bg-slate-700/50 rounded-lg h-48 animate-pulse-fast"></div>
        </div>
      )}

      {results && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {Object.entries(results).map(([tld, domains]) => (
            (Array.isArray(domains) && domains.length > 0) && (
              <div key={tld} className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-4 border-b border-slate-200 dark:border-slate-600 pb-2">
                  {tld.toUpperCase()}
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {domains.map((domain, index) => (
                    <p key={index} className="text-slate-600 dark:text-slate-300 truncate">{domain}</p>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default DomainExtractor;
