
import React, { useState } from 'react';
import type { GeneratedDomain } from '../types';
import { generateDomainNames } from '../services/geminiService';
import { LoadingSpinner, SparklesIcon } from './icons';

type LengthPreference = 'any' | 'short' | 'medium' | 'long';

const DomainGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GeneratedDomain[]>([]);

  const tldOptions = ['.com', '.io', '.ai', '.co', '.net', '.org'];
  const [selectedTlds, setSelectedTlds] = useState<string[]>(['.com', '.io']);

  const lengthOptions: { id: LengthPreference; label: string }[] = [
    { id: 'any', label: 'Any' },
    { id: 'short', label: 'Short (4-6)' },
    { id: 'medium', label: 'Medium (7-12)' },
    { id: 'long', label: 'Long (13+)' },
  ];
  const [lengthPreference, setLengthPreference] = useState<LengthPreference>('any');


  const handleTldToggle = (tld: string) => {
    setSelectedTlds(prev =>
      prev.includes(tld)
        ? prev.filter(item => item !== tld)
        : [...prev, tld]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError('Please enter a keyword or niche.');
      return;
    }
    if (selectedTlds.length === 0) {
      setError('Please select at least one TLD.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const domains = await generateDomainNames(keyword.trim(), selectedTlds, lengthPreference);
      setResults(domains);
    } catch (err) {
      setError('Failed to generate domain names. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusColor = (status: GeneratedDomain['status']) => {
    switch (status) {
      case 'Likely Available':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20';
      case 'Maybe Taken':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20';
      case 'Likely Taken':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20';
    }
  }


  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">AI Domain Name Generator</h2>
      <p className="text-center text-slate-500 dark:text-slate-400 mt-2">Get creative and available domain ideas in seconds.</p>
      
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., fitness, crypto, ai"
            className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {isLoading ? <LoadingSpinner /> : <SparklesIcon className="w-5 h-5 mr-2" />}
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-6 space-y-4">
           <div>
              <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Select Length:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {lengthOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLengthPreference(opt.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 ${
                      lengthPreference === opt.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
          </div>
          <div>
              <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Select TLDs:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {tldOptions.map(tld => (
                  <button
                    key={tld}
                    type="button"
                    onClick={() => handleTldToggle(tld)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 ${
                      selectedTlds.includes(tld)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {tld}
                  </button>
                ))}
              </div>
          </div>
        </div>
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      
      {isLoading && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-slate-200 dark:bg-slate-700/50 rounded-lg h-16 animate-pulse-fast"></div>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8 animate-fade-in">
           <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-4">
            Domain availability is an AI-generated estimation. Always verify with a registrar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((domain, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg gap-4"
              >
                <span className="font-bold text-lg text-slate-800 dark:text-slate-100 flex-grow truncate">{domain.name}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusColor(domain.status)}`}>
                    {domain.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainGenerator;
