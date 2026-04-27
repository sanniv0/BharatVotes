import { render, screen } from '@testing-library/react';
import { JourneyStep } from '../components/JourneyStep';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { UserPlus } from 'lucide-react';

describe('JourneyStep', () => {
  const mockStep = {
    id: 'test',
    title: 'Test Step',
    icon: <UserPlus />,
    description: 'Test description',
    details: 'Test details',
    links: [{ label: 'Test Link', url: 'https://example.com' }]
  };

  it('renders step information correctly', () => {
    render(<JourneyStep step={mockStep} index={0} />);
    
    expect(screen.getByText('Test Step')).toBeInTheDocument();
    expect(screen.getByText(/Test description/)).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Open Test Link/i })).toHaveAttribute('href', 'https://example.com');
  });
});
