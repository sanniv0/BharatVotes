import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatTerminal } from '../components/ChatTerminal';

describe('ChatTerminal', () => {
  const props = {
    messages: [{ role: 'model' as const, content: 'Hello' }],
    input: '',
    setInput: vi.fn(),
    isLoading: false,
    onSend: vi.fn(),
    onExit: vi.fn()
  };

  it('renders messages', () => {
    render(<ChatTerminal {...props} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles input', () => {
    render(<ChatTerminal {...props} />);
    const input = screen.getByPlaceholderText(/Ask about EPIC card/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(props.setInput).toHaveBeenCalledWith('test');
  });

  it('handles suggestions', () => {
    render(<ChatTerminal {...props} />);
    fireEvent.click(screen.getByText('New Voter Form 6'));
    expect(props.setInput).toHaveBeenCalledWith('New Voter Form 6');
  });
});
