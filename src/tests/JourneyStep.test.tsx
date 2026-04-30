import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { JourneyStep } from '../components/JourneyStep';
import { ElectionStep } from '../types';

const mockStep: ElectionStep = {
  id: 'test',
  title: 'Test Step',
  icon: <div />,
  description: 'Test description',
  details: 'Test details',
  links: [{ label: 'Test Link', url: 'https://example.com' }]
};

describe('JourneyStep', () => {
  it('renders step information', () => {
    render(<JourneyStep step={mockStep} index={0} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Test Step')).toBeInTheDocument();
    expect(screen.getByText(/Test description/)).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    render(<JourneyStep step={mockStep} index={0} />);
    const link = screen.getByRole('link', { name: /Open Test Link/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
