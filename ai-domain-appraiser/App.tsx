
import React, { useState, useCallback } from 'react';
import { DomainInput } from './components/DomainInput';
import { AppraisalResultDisplay } from './components/AppraisalResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { appraiseDomain } from './services/geminiService';
import type { AppraisalResult } from './types';

const App: React.FC = () => {
  const [domainName, setDomainName] = useState('');
  const [appraisalResult, setAppraisalResult] = useState<AppraisalResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAppraise = useCallback(async (domainToAppraise: string) => {
    if (!domainToAppraise) {
      setError('Please enter a domain name.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAppraisalResult(null);

    try {
      const result = await appraiseDomain(domainToAppraise);
      setAppraisalResult(result);
    } catch (err) {
      console.error(err);
      setError('Failed to appraise domain. The AI model may be busy. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-2">
            AI Domain Appraiser
          </h1>
          <p className="text-lg text-gray-400">
            Instant, data-driven domain valuations powered by Gemini.
          </p>
        </header>

        <main>
          <DomainInput
            domainName={domainName}
            setDomainName={setDomainName}
            onAppraise={handleAppraise}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg animate-fade-in">
              <p>{error}</p>
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {appraisalResult && (
            <div className="mt-8 animate-slide-in-up">
              <AppraisalResultDisplay result={appraisalResult} domain={domainName} />
            </div>
          )}
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Domain Appraiser. All rights reserved.</p>
          <p className="mt-1">Valuations are estimates and not guarantees of sale price.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
