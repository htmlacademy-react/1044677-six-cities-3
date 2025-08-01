import Sort from './sort';
import { Provider } from 'react-redux';
import { SortType } from '../../const';
import { describe, it, expect, vi } from 'vitest';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

const mockStore = configureMockStore();

vi.mock('../../hooks/store', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}));

import { useAppSelector } from '../../hooks/store';

describe('Component: Sort', () => {
  it('should render sort component with current sort type', () => {
    vi.mocked(useAppSelector).mockReturnValue(SortType.Popular);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('sorting-type')).toHaveTextContent(SortType.Popular);
  });

  it('should toggle dropdown when sort type is clicked', () => {
    vi.mocked(useAppSelector).mockReturnValue(SortType.Popular);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    const sortTypeElement = screen.getByTestId('sorting-type');
    const dropdownList = screen.getByTestId('sorting-options');

    expect(dropdownList).not.toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement);

    expect(dropdownList).toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement);

    expect(dropdownList).not.toHaveClass('places__options--opened');
  });

  it('should highlight active sort option', () => {
    vi.mocked(useAppSelector).mockReturnValue(SortType.PriceLowToHigh);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    const sortTypeElement = screen.getByTestId('sorting-type');
    fireEvent.click(sortTypeElement);

    const activeOptions = screen.getAllByText('Price: low to high');
    const activeOption = activeOptions.find((option) => option.tagName === 'LI');
    expect(activeOption).toHaveClass('places__option--active');
  });

  it('should close dropdown when clicking outside', () => {
    vi.mocked(useAppSelector).mockReturnValue(SortType.Popular);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    const sortTypeElement = screen.getByTestId('sorting-type');
    const dropdownList = screen.getByTestId('sorting-options');

    expect(dropdownList).not.toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement);
    expect(dropdownList).toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement);
    expect(dropdownList).not.toHaveClass('places__options--opened');
  });
});
