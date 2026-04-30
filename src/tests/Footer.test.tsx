import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../components/Footer';

describe('Footer', () => {
  it('renders footer info', () => {
    render(<Footer />);
    expect(screen.getByText(/Election Commission of India Portal/i)).toBeInTheDocument();
  });
});
