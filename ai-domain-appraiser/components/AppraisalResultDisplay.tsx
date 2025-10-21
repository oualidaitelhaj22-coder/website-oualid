
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { AppraisalResult, KeyFactor } from '../types';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ec4899'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded-md shadow-lg">
        <p className="label text-gray-300">{`${label} : ${payload[0].value}/10`}</p>
        <p className="intro text-gray-400 text-sm">{payload[0].payload.analysis}</p>
      </div>
    );
  }
  return null;
};


export const AppraisalResultDisplay: React.FC<{ result: AppraisalResult, domain: string }> = ({ result, domain }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-6 sm:p-8 space-y-8">
      
      {/* Header & Value */}
      <div className="text-center border-b border-gray-700 pb-6">
        <h2 className="text-2xl font-bold text-gray-300">Appraisal for <span className="text-blue-400">{domain}</span></h2>
        <p className="text-6xl sm:text-7xl font-extrabold text-brand-green mt-4">{formatCurrency(result.estimatedValue)}</p>
        <p className="text-gray-400 mt-2 text-lg">Value Range: {result.valueRange}</p>
      </div>
      
      {/* Explanation */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-200">Valuation Analysis</h3>
        <p className="text-gray-300 leading-relaxed">{result.explanation}</p>
      </div>
      
      {/* Key Factors Chart */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-200">Key Factors Breakdown</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={result.keyFactors} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="factor" stroke="#9ca3af" tick={{ fill: '#d1d5db' }} />
              <YAxis stroke="#9ca3af" domain={[0, 10]} tick={{ fill: '#d1d5db' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(107, 114, 128, 0.2)' }}/>
              <Bar dataKey="score">
                {result.keyFactors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Comparable Sales */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Comparable Sales</h3>
          <ul className="space-y-2">
            {result.comparableSales.map((sale, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                <span className="font-mono text-gray-300">{sale.domain}</span>
                <span className="font-semibold text-green-400">{formatCurrency(sale.price)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Similar Available Domains */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Similar & Available</h3>
          <ul className="space-y-2">
            {result.similarAvailableDomains.map((domain, index) => (
              <li key={index} className="bg-gray-800 p-3 rounded-md">
                <span className="font-mono text-blue-300">{domain}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
