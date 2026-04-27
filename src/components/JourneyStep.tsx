import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ElectionStep } from '../types';

interface JourneyStepProps {
  step: ElectionStep;
  index: number;
}

export function JourneyStep({ step, index }: JourneyStepProps) {
  return (
    <div 
      className="border-l-2 border-brand-ink pl-8 pr-4 py-4 group transition-all duration-300 hover:bg-gray-50/50"
    >
      <span className="text-5xl font-serif italic block mb-4 text-gray-300 group-hover:text-brand-accent transition-colors">
        0{index + 1}
      </span>
      <h3 className="text-xl font-bold uppercase mb-3 tracking-tight flex items-center gap-2">
        {step.title}
        <span className="w-1 h-1 bg-brand-accent rounded-full opacity-0 group-hover:opacity-100" />
      </h3>
      <p className="text-sm leading-relaxed text-gray-500 mb-6 max-w-sm">
        {step.description} {step.details}
      </p>
      
      <div className="flex flex-wrap gap-4">
        {step.links.map(link => (
          <a 
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${link.label} in a new tab`}
            className="text-[10px] font-bold uppercase border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-all inline-flex items-center gap-1"
          >
            {link.label} <ChevronRight className="w-2.5 h-2.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
