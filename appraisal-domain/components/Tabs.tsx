
import React from 'react';
import type { ToolTabType } from '../types';

interface TabsProps {
  activeTab: ToolTabType;
  setActiveTab: (tab: ToolTabType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: ToolTabType; label: string }[] = [
    { id: 'appraisal', label: 'Appraisal' },
    { id: 'generator', label: 'Name Generator' },
    { id: 'extractor', label: 'Keyword Extractor' },
  ];

  return (
    <div className="flex justify-center border-b border-slate-200 dark:border-slate-700">
      <nav className="-mb-px flex space-x-6" aria-label="Tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;