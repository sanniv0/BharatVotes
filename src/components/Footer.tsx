import React from 'react';

export function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-wrap justify-center gap-10">
        <div className="text-[10px] uppercase font-black tracking-[0.2em] flex items-center gap-2">
          <span className="text-gray-300">Data Source:</span> 
          <span className="hover:text-brand-accent cursor-default transition-colors underline decoration-gray-200 decoration-2 underline-offset-4">Election Commission of India Portal</span>
        </div>
        <div className="text-[10px] uppercase font-black tracking-[0.2em] flex items-center gap-2">
          <span className="text-gray-300">Portal Sync:</span> 
          <span className="font-mono">NVSP / {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-sm"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-brand-ink shadow-sm"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-200 shadow-sm"></div>
      </div>
    </footer>
  );
}
