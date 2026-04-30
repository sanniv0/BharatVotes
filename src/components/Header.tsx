import React from 'react';
import { cn } from '../lib/utils';

interface HeaderProps {
  /** The currently active navigation tab */
  activeTab: 'education' | 'assistant';
  /** Function to set the active navigation tab */
  setActiveTab: (tab: 'education' | 'assistant') => void;
}

/**
 * Header Component
 * Displays the application title, status, and navigation tabs.
 */
export const Header = React.memo(function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-accent text-white px-4 py-2 rounded-lg z-50 font-bold"
      >
        Skip to main content
      </a>
      <header className="px-6 md:px-12 pt-8 md:pt-12 pb-8 flex flex-col md:flex-row justify-between items-start gap-8 max-w-7xl mx-auto w-full">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4 uppercase">
            Bharat <span className="text-brand-accent italic font-serif lowercase">Votes</span>
          </h1>
          <p className="text-base md:text-xl font-medium text-gray-500 uppercase tracking-widest leading-none">
            The Largest Democracy's Navigation System
          </p>
        </div>
        <div className="text-right flex flex-col items-end gap-2 w-full md:w-auto">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] bg-brand-ink text-white px-3 py-1.5 inline-block" aria-label="Portal Status: Online">Portal Online</div>
          <p className="text-xs font-mono opacity-40 uppercase tracking-tighter">ECI Instance v.75.2024</p>
          
          <nav className="mt-6 flex flex-wrap justify-end gap-6 text-xs font-bold uppercase tracking-widest border-t border-gray-100 pt-4 w-full">
            <button 
              onClick={() => setActiveTab('education')}
              aria-pressed={activeTab === 'education'}
              className={cn(
                "pb-1 border-b-2 transition-all focus:outline-none focus:border-brand-accent",
                activeTab === 'education' ? "border-brand-accent text-brand-accent" : "border-transparent text-gray-400 hover:text-brand-ink hover:border-gray-200"
              )}
            >
              Democratic Journey
            </button>
            <button 
              onClick={() => setActiveTab('assistant')}
              aria-pressed={activeTab === 'assistant'}
              className={cn(
                "pb-1 border-b-2 transition-all focus:outline-none focus:border-brand-accent",
                activeTab === 'assistant' ? "border-brand-accent text-brand-accent" : "border-transparent text-gray-400 hover:text-brand-ink hover:border-gray-200"
              )}
            >
              ECI Logistics Bot
            </button>
          </nav>
        </div>
      </header>
    </>
  );
});
