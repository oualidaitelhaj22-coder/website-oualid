
import React from 'react';

interface DomainInputProps {
  domainName: string;
  setDomainName: (name: string) => void;
  onAppraise: (name: string) => void;
  isLoading: boolean;
}

export const DomainInput: React.FC<DomainInputProps> = ({ domainName, setDomainName, onAppraise, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAppraise(domainName);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-2xl">
      <form onSubmit={handleSubmit}>
        <label htmlFor="domain-input" className="block text-lg font-medium text-gray-300 mb-2">
          Enter Domain to Appraise
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            id="domain-input"
            type="text"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value.toLowerCase())}
            placeholder="e.g., example.com"
            className="flex-grow bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              'Appraise'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
