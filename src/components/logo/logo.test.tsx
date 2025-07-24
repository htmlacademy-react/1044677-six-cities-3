import Logo from './logo';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Component: Logo', () => {
  it('should render logo with correct link and image', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    const logoLink = screen.getByRole('link');
    const logoImage = screen.getByRole('img', { name: /6 cities logo/i });

    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toHaveClass('header__logo-link', 'header__logo-link--active');

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImage).toHaveAttribute('alt', '6 cities logo');
    expect(logoImage).toHaveAttribute('width', '81');
    expect(logoImage).toHaveAttribute('height', '41');
    expect(logoImage).toHaveClass('header__logo');
  });
});
