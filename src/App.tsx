import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Vote,
  CheckCircle2,
  MapPin,
  Calendar,
  Info,
  ChevronRight,
  ExternalLink,
  UserPlus,
  BookOpen
} from 'lucide-react';
import { Header } from './components/Header';
import { JourneyStep } from './components/JourneyStep';
import { ChatTerminal } from './components/ChatTerminal';
import { Footer } from './components/Footer';
import { askCivicGuide } from './services/geminiService';
import { logQuery } from './lib/firebase';
import { Message, ElectionStep } from './types';

const ELECTION_STEPS: ElectionStep[] = [
  {
    id: 'registration',
    title: 'New Registration',
    icon: <UserPlus className="w-5 h-5" />,
    description: 'Ensure you are in the Electoral Roll.',
    details: 'Use Form 6 for new registration if you are 18+. Use NVSP portal or Voter Helpline App.',
    links: [{ label: 'Register on Voter Portal', url: 'https://voters.eci.gov.in' }]
  },
  {
    id: 'id-card',
    title: 'EPIC Card',
    icon: <Vote className="w-5 h-5" />,
    description: 'The Voter Identity Card (EPIC).',
    details: 'Download your e-EPIC from the portal once your registration is approved by the ERO.',
    links: [{ label: 'Download e-EPIC', url: 'https://voters.eci.gov.in/download-epic' }]
  },
  {
    id: 'search',
    title: 'Check Name',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Verify your name in the list.',
    details: 'Always check if your name appears in the current electoral roll of your constituency before voting.',
    links: [{ label: 'Electoral Search', url: 'https://electoralsearch.eci.gov.in' }]
  },
  {
    id: 'booth',
    title: 'Find Your Booth',
    icon: <MapPin className="w-5 h-5" />,
    description: 'Locate your polling station.',
    details: 'Find your polling booth location and BLO details using your EPIC number or name.',
    links: [{ label: 'Booth Locator', url: 'https://electoralsearch.eci.gov.in/pollingstation' }]
  },
  {
    id: 'vote',
    title: 'Cast on EVM/VVPAT',
    icon: <CheckCircle2 className="w-5 h-5" />,
    description: 'Visit booth and vote.',
    details: 'Verify at booth, get inked, and press the blue button on the Balloting Unit of the EVM.',
    links: [{ label: 'Voting Process Guide', url: 'https://eci.gov.in/voter/voter-guide/' }]
  }
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Namaste! I'm Bharat Votes. I can help you with registration (Form 6), finding your polling station, or understanding the EVM/VVPAT process in India. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'education' | 'assistant'>('education');

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

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

    setIsLoading(false);

    if (response) {
      logQuery(userMessage, response);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink font-sans selection:bg-brand-accent selection:text-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 min-h-[60vh]">
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
                  {ELECTION_STEPS.map((step, idx) => (
                    <JourneyStep key={step.id} step={step} index={idx} />
                  ))}
                </div>

                {/* Interactive Assistant Bar */}
                <div
                  onClick={() => setActiveTab('assistant')}
                  className="bg-brand-ink text-white p-10 rounded-tr-[100px] flex flex-col md:flex-row items-center justify-between mt-12 cursor-pointer group hover:bg-gray-900 transition-colors"
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
                    {[
                      { label: "Voters' Service Portal", desc: 'Registration', url: 'https://voters.eci.gov.in' },
                      { label: 'Electoral Roll Search', desc: 'Verify', url: 'https://electoralsearch.eci.gov.in' },
                      { label: "Voter Guide (ECI)", desc: 'Manuals', url: 'https://eci.gov.in/voter/voter-guide/' },
                      { label: 'Know Your Candidate', desc: 'Research', url: 'https://affidavit.eci.gov.in' }
                    ].map(r => (
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
                    ))}
                  </ul>
                </div>

                <div className="mt-20 bg-brand-muted p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full -mr-12 -mt-12" />
                  <h5 className="text-sm font-bold uppercase mb-6 tracking-tighter italic font-serif">Election Window Status</h5>
                  <div className="h-1 bg-gray-200 w-full mb-3 rounded-full overflow-hidden">
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
            <ChatTerminal
              messages={messages}
              input={input}
              setInput={setInput}
              isLoading={isLoading}
              onSend={handleSend}
              onExit={() => setActiveTab('education')}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
