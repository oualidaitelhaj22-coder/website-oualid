
import React, { useState } from 'react';
import type { AppraisalResult } from '../types';
import { appraiseDomain } from '../services/geminiService';
import { LoadingSpinner, SearchIcon } from './icons';

const DomainAppraisal: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AppraisalResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) {
      setError('Please enter a domain name.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const appraisal = await appraiseDomain(domain.trim());
      setResult(appraisal);
    } catch (err) {
      setError('Failed to appraise domain. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">Domain Valuation</h2>
      <p className="text-center text-slate-500 dark:text-slate-400 mt-2">Get an AI-powered valuation for any domain.</p>
      
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="e.g., example.com"
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <LoadingSpinner /> : <SearchIcon className="w-5 h-5 mr-2"/>}
          {isLoading ? 'Appraising...' : 'Appraise'}
        </button>
      </form>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      
      {isLoading && (
        <div className="mt-8 space-y-6">
          <div className="bg-slate-200 dark:bg-slate-700/50 rounded-lg p-6 h-24 w-full animate-pulse-fast"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-200 dark:bg-slate-700/50 rounded-lg h-20 animate-pulse-fast"></div>
            <div className="bg-slate-200 dark:bg-slate-700/50 rounded-lg h-20 animate-pulse-fast"></div>
            <div className="bg-slate-200 dark:bg-slate-700/50 rounded-lg h-20 animate-pulse-fast"></div>
          </div>
          <div className="bg-slate-200 dark:bg-slate-700/50 rounded-lg h-40 animate-pulse-fast"></div>
        </div>
      )}

      {result && (
        <div className="mt-10 animate-fade-in">
          <h3 className="text-xl font-bold text-center">Appraisal for <span className="text-blue-500 dark:text-blue-400">{result.domainName}</span></h3>
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl text-white text-center shadow-lg">
            <p className="text-lg">Estimated Value</p>
            <p className="text-5xl font-extrabold tracking-tight">{formatCurrency(result.estimatedValue)}</p>
            <p className="mt-2 text-blue-100">Resale Range: {result.resaleRange}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
              <p className="font-semibold">Brandability</p>
              <p className="text-2xl font-bold text-green-500">{result.brandabilityScore}/100</p>
            </div>
            <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
              <p className="font-semibold">SEO Score</p>
              <p className="text-2xl font-bold text-green-500">{result.seoScore}/100</p>
            </div>
            <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
              <p className="font-semibold">TLD Quality</p>
              <p className="text-2xl font-bold text-green-500">{result.tldQuality}</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Comparable Sales (AI Estimated)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-200 dark:bg-slate-600/50">
                  <tr>
                    <th className="p-3 font-semibold rounded-l-lg">Domain</th>
                    <th className="p-3 font-semibold text-right rounded-r-lg">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {result.comparableSales.map((sale, index) => (
                    <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="p-3">{sale.domain}</td>
                      <td className="p-3 text-right font-medium">{formatCurrency(sale.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainAppraisal;
