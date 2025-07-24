import Spinner from './spinner';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.querySelector('.spinner');

    expect(spinnerContainer).toBeInTheDocument();

    const loader = spinnerContainer?.querySelector('.loader');
    expect(loader).toBeInTheDocument();

    const loaderDivs = loader?.querySelectorAll('div');
    expect(loaderDivs).toHaveLength(2);
  });
});
