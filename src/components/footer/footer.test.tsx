import Footer from './footer';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Component: Footer', () => {
  it('should render footer with logo', () => {
    render(<Footer />);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '#');
  });
});
