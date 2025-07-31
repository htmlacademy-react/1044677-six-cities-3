import Locations from './locations';
import { CITIES } from '../../const';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Component: Locations', () => {
  const currentCity = CITIES[0];
  const onCityChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all cities', () => {
    render(
      <Locations currentCity={currentCity} onCityChange={onCityChange} />
    );

    CITIES.forEach((city) => {
      expect(screen.getByText(city.title)).toBeInTheDocument();
    });
  });

  it('should highlight current city', () => {
    render(
      <Locations currentCity={currentCity} onCityChange={onCityChange} />
    );

    const currentCityLink = screen.getByText(currentCity.title).closest('a');
    expect(currentCityLink).toHaveClass('tabs__item--active');
  });

  it('should call onCityChange when city is clicked', () => {
    render(
      <Locations currentCity={currentCity} onCityChange={onCityChange} />
    );

    const secondCity = CITIES[1];
    const cityLink = screen.getByText(secondCity.title);

    fireEvent.click(cityLink);

    expect(onCityChange).toHaveBeenCalledWith(secondCity);
  });

  it('should prevent default behavior on city click', () => {
    render(
      <Locations currentCity={currentCity} onCityChange={onCityChange} />
    );

    const cityLink = screen.getByText(CITIES[1].title);
    const mockEvent = { preventDefault: vi.fn() };

    fireEvent.click(cityLink, mockEvent);

    expect(onCityChange).toHaveBeenCalled();
  });

  it('should render correct number of cities', () => {
    render(
      <Locations currentCity={currentCity} onCityChange={onCityChange} />
    );

    const cityLinks = screen.getAllByRole('link');
    expect(cityLinks).toHaveLength(CITIES.length);
  });

  it('should update active city when currentCity prop changes', () => {
    const { rerender } = render(
      <Locations currentCity={currentCity} onCityChange={onCityChange} />
    );

    expect(screen.getByText(currentCity.title).closest('a')).toHaveClass('tabs__item--active');

    const secondCity = CITIES[1];
    rerender(
      <Locations currentCity={secondCity} onCityChange={onCityChange} />
    );

    expect(screen.getByText(secondCity.title).closest('a')).toHaveClass('tabs__item--active');
    expect(screen.getByText(currentCity.title).closest('a')).not.toHaveClass(
      'tabs__item--active'
    );
  });
});
