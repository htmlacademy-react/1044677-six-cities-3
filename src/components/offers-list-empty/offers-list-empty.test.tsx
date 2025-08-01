import { CITIES } from '../../const';
import OffersListEmpty from './offers-list-empty';
import { render, screen } from '@testing-library/react';

describe('Component: OffersListEmpty', () => {
  const currentCity = CITIES[0];

  it('should render empty state message', () => {
    render(<OffersListEmpty currentCity={currentCity} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${currentCity.title}`)).toBeInTheDocument();
  });

  it('should render with correct city name', () => {
    const cologneCity = CITIES[1];
    render(<OffersListEmpty currentCity={cologneCity} />);

    expect(screen.getByText(`We could not find any property available at the moment in ${cologneCity.title}`)).toBeInTheDocument();
  });

  it('should render empty state message correctly', () => {
    render(<OffersListEmpty currentCity={currentCity} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in/)).toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    render(<OffersListEmpty currentCity={currentCity} />);

    const container = screen.getByText('No places to stay available').closest('div');
    expect(container).toHaveClass('cities__status-wrapper');
  });
});
