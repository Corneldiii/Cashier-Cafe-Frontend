import React from 'react';
import { Coffee } from 'lucide-react';

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      
      <div className="flex flex-col items-center justify-center p-8 bg-white/90 rounded-3xl shadow-xl shadow-sky-200/40 border border-sky-100 transition-all duration-300">
        
        <div className="flex space-x-2 mb-1">
          <div className="w-1.5 h-5 bg-sky-200 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-7 bg-sky-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-4 bg-sky-200 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>

        <div className="relative p-5 bg-sky-50 rounded-full shadow-inner">
          <Coffee className="w-12 h-12 text-sky-400" strokeWidth={2} />
          
          <div className="absolute inset-0 border-4 border-transparent border-t-sky-400 border-r-sky-300 rounded-full animate-spin"></div>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-sky-500 tracking-wide animate-pulse">
            Menyeduh Data...
          </h3>
          <p className="text-sm font-medium text-sky-400/80 mt-1">
            Mohon tunggu sebentar
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Loading;