import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import { askCivicGuide } from '../services/geminiService';

vi.mock('../services/geminiService', () => ({
  askCivicGuide: vi.fn()
}));

vi.mock('../lib/firebase', () => ({
  logQuery: vi.fn(),
  logUserEvent: vi.fn(),
  db: {},
  auth: {}
}));

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (askCivicGuide as any).mockImplementation(async (m: any, h: any, cb: any) => {
      cb('Mock response');
      return 'Mock response';
    });
  });

  it('renders and switches tabs', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Ask Bharat Bot'));
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Ask about EPIC card/i)).toBeInTheDocument();
    });
  });

  it('sends message and logs analytics', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Ask Bharat Bot'));
    
    await waitFor(() => {
      const input = screen.getByPlaceholderText(/Ask about EPIC card/i);
      fireEvent.change(input, { target: { value: 'hi' } });
      fireEvent.click(screen.getByLabelText('Send message'));
    });

    await waitFor(() => {
      expect(screen.getByText('Mock response')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    (askCivicGuide as any).mockImplementationOnce(async () => {
      throw new Error('API Failure');
    });

    render(<App />);
    fireEvent.click(screen.getByText('Ask Bharat Bot'));
    
    await waitFor(() => {
      const input = screen.getByPlaceholderText(/Ask about EPIC card/i);
      fireEvent.change(input, { target: { value: 'test error' } });
      fireEvent.click(screen.getByLabelText('Send message'));
    });

    await waitFor(() => {
      expect(screen.getByText(/Unable to reach the assistant/i)).toBeInTheDocument();
    });
  });
});
