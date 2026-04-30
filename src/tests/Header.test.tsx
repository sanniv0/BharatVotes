import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/Header';

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header activeTab="education" setActiveTab={vi.fn()} />);
    expect(screen.getAllByText(/Bharat/i)[0]).toBeInTheDocument();
  });

  it('switches tabs', () => {
    const setActiveTab = vi.fn();
    render(<Header activeTab="education" setActiveTab={setActiveTab} />);
    
    fireEvent.click(screen.getByText('ECI Logistics Bot'));
    expect(setActiveTab).toHaveBeenCalledWith('assistant');

    fireEvent.click(screen.getByText('Democratic Journey'));
    expect(setActiveTab).toHaveBeenCalledWith('education');
  });
});
