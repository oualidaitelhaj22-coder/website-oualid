
import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center my-10 animate-fade-in">
    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-gray-300">Our AI is analyzing your domain...</p>
    <p className="text-sm text-gray-500">This may take a few seconds.</p>
  </div>
);
