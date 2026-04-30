import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

vi.mock('../services/geminiService', () => ({
  askCivicGuide: vi.fn(async (m, h, cb) => {
    cb('Mock response');
    return 'Mock response';
  })
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
});
