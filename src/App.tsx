import React, { useState, useCallback, Suspense, lazy, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Header } from './components/Header';
import { JourneyStep } from './components/JourneyStep';
import { Footer } from './components/Footer';

const ChatTerminal = lazy(() => import('./components/ChatTerminal').then(m => ({ default: m.ChatTerminal })));
import { askCivicGuide } from './services/geminiService';
import { logQuery, logUserEvent } from './lib/firebase';
import { Message } from './types';
import { ELECTION_STEPS, RESOURCE_LINKS } from './constants';

/**
 * Main Application Component for Bharat Votes
 * Handles state for the active tab, chatbot messages, and interactive civic guide.
 * Optimized for performance and accessibility.
 */
export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Namaste! I'm Bharat Votes. I can help you with registration (Form 6), finding your polling station, or understanding the EVM/VVPAT process in India. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'education' | 'assistant'>('education');
  const [error, setError] = useState<string | null>(null);

  /**
   * Switches the active navigation tab and logs the event.
   * @param tab The target tab to switch to.
   */
  const handleTabChange = useCallback((tab: 'education' | 'assistant') => {
    setActiveTab(tab);
    logUserEvent('tab_switched', { tab_name: tab });
  }, []);

  /**
   * Handles sending a message to the AI assistant.
   * Includes error handling and analytics logging.
   */
  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      // Add a placeholder message for the model
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      const response = await askCivicGuide(userMessage, history, (chunk) => {
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = { role: 'model', content: chunk };
          return next;
        });
      });

      if (response) {
        logQuery(userMessage, response);
        logUserEvent('chat_message_sent', { message_length: userMessage.length });
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setError("Unable to reach the assistant. Please try again later.");
      // Remove the empty placeholder if error occurs
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  /**
   * Handles keyboard interactions for the interactive assistant bar.
   */
  const handleAssistantBarKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabChange('assistant');
    }
  };

  /**
   * Memoized election steps to prevent unnecessary re-renders.
   */
  const renderedSteps = useMemo(() => (
    ELECTION_STEPS.map((step, idx) => (
      <JourneyStep key={step.id} step={step} index={idx} />
    ))
  ), []);

  /**
   * Memoized resource links to prevent unnecessary re-renders.
   */
  const renderedResources = useMemo(() => (
    RESOURCE_LINKS.map(r => (
      <li key={r.url} className="group">
        <span className="text-[10px] font-bold block text-gray-400 mb-2 uppercase tracking-widest group-hover:text-brand-accent transition-colors">{r.desc}</span>
        <a
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold border-b-2 border-transparent hover:border-brand-ink transition-all flex items-center justify-between"
        >
          {r.label}
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />
        </a>
      </li>
    ))
  ), []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink font-sans selection:bg-brand-accent selection:text-white">
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />

      <main id="main-content" className="max-w-7xl mx-auto px-6 md:px-12 py-8 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'education' ? (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="grid grid-cols-12 gap-12"
            >
              {/* Left Column: The Journey */}
              <div className="col-span-12 lg:col-span-8 flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 mb-16">
                  {renderedSteps}
                </div>

                {/* Interactive Assistant Bar */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleTabChange('assistant')}
                  onKeyDown={handleAssistantBarKeyDown}
                  aria-label="Open Bharat Bot Assistant"
                  className="bg-brand-ink text-white p-10 rounded-tr-[100px] flex flex-col md:flex-row items-center justify-between mt-12 cursor-pointer group hover:bg-gray-900 transition-colors focus:ring-4 focus:ring-brand-accent focus:outline-none"
                >
                  <div className="mb-6 md:mb-0">
                    <p className="text-[10px] uppercase font-bold tracking-[0.4em] mb-2 opacity-50 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                      Digital India Assistant
                    </p>
                    <h2 className="text-3xl font-light italic font-serif leading-tight">
                      "Help me with Form 6 registration or finding my Polling Station."
                    </h2>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="hidden sm:block bg-white/10 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider">Need help?</div>
                    <div className="bg-brand-accent px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest group-hover:scale-105 transition-transform">Ask Bharat Bot</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Resources */}
              <aside className="col-span-12 lg:col-span-4 border-l border-gray-100 lg:pl-12 flex flex-col justify-between pb-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> ECI National Registry
                  </h4>
                  <ul className="space-y-10">
                    {renderedResources}
                  </ul>
                </div>

                <div className="mt-20 bg-brand-muted p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full -mr-12 -mt-12" />
                  <h5 className="text-sm font-bold uppercase mb-6 tracking-tighter italic font-serif">Election Window Status</h5>
                  <div className="h-1 bg-gray-200 w-full mb-3 rounded-full overflow-hidden" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full bg-brand-ink w-[80%]" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-tighter">
                    <span className="opacity-40">Roll Revision</span>
                    <span className="font-bold text-brand-accent">Election Preparedness</span>
                  </div>
                </div>
              </aside>
            </motion.div>
          ) : (
            <Suspense fallback={<div className="flex justify-center items-center h-64 text-brand-ink/50" aria-live="polite">Loading Bharat Bot...</div>}>
              <ChatTerminal
                messages={messages}
                input={input}
                setInput={setInput}
                isLoading={isLoading}
                onSend={handleSend}
                onExit={() => handleTabChange('education')}
                error={error}
              />
            </Suspense>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
