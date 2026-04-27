import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { Message } from '../types';

interface ChatTerminalProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSend: () => void;
  onExit: () => void;
}

export function ChatTerminal({ 
  messages, 
  input, 
  setInput, 
  isLoading, 
  onSend, 
  onExit 
}: ChatTerminalProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };

  const suggestions = ["New Voter Form 6", "NRI Voter Info", "Download e-EPIC", "Check Voter List"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="max-w-5xl mx-auto h-[75vh] flex flex-col bg-white border border-gray-100 rounded-[3rem] shadow-2xl shadow-gray-200/50 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent" />
      
      {/* Chat Header */}
      <div className="px-10 py-6 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-ink flex items-center justify-center text-white rounded-2xl rotate-3 shadow-lg shadow-gray-200">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight">Bharat Votes Logistics</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ECI Helper Terminal</p>
          </div>
        </div>
        <button 
          onClick={onExit}
          className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 hover:bg-gray-50 rounded-full transition-colors border border-gray-100"
        >
          Exit Terminal
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-10 space-y-10 bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] [background-size:20px_20px]">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex max-w-[85%] flex-col",
              m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className={cn(
              "px-8 py-5 rounded-3xl leading-relaxed text-sm",
              m.role === 'user' 
                ? "bg-brand-ink text-white rounded-tr-none shadow-xl shadow-brand-ink/10" 
                : "bg-white text-gray-800 rounded-tl-none border-2 border-gray-100 shadow-sm"
            )}>
              {m.role === 'model' ? (
                <div className="markdown-body prose prose-sm prose-neutral max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-headings:italic">
                  <Markdown>{m.content}</Markdown>
                </div>
              ) : (
                m.content
              )}
            </div>
            <span className="mt-3 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
               {m.role === 'user' ? 'Elector Input' : 'Commission Analysis'}
            </span>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex mr-auto items-start flex-col gap-2">
            <div className="bg-gray-100 px-6 py-3 rounded-3xl rounded-tl-none flex gap-1.5 items-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-brand-ink rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-tight text-gray-400 ml-2 italic">
              Note: Responses may be delayed during peak hours. Please refer to our journey guide for verified info.
            </p>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-8 border-t border-gray-100 bg-white">
        <form 
          onSubmit={handleSubmit}
          className="flex items-center gap-4"
        >
          <div className="flex-1 bg-gray-50 border-2 border-transparent focus-within:border-brand-ink focus-within:bg-white rounded-2xl flex items-center px-6 py-1 transition-all">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about EPIC card, Form 6, or Polling Booths..."
              className="w-full bg-transparent py-4 text-sm font-medium outline-none placeholder:text-gray-400"
            />
          </div>
          <button 
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="w-16 h-16 bg-brand-accent text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all shadow-xl shadow-brand-accent/20 grow-0 shrink-0"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {suggestions.map(suggestion => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="whitespace-nowrap px-4 py-2 border border-gray-100 bg-gray-50/50 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-ink hover:border-gray-300 transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
