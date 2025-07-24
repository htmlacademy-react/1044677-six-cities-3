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
    expect(document.querySelector('.places__sorting-type')).toHaveTextContent(SortType.Popular);
  });

  it('should toggle dropdown when sort type is clicked', () => {
    vi.mocked(useAppSelector).mockReturnValue(SortType.Popular);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    const sortTypeElement = document.querySelector('.places__sorting-type');
    const dropdownList = document.querySelector('.places__options');

    expect(dropdownList).not.toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement!);

    expect(dropdownList).toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement!);

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

    const sortTypeElement = document.querySelector('.places__sorting-type');
    fireEvent.click(sortTypeElement!);

    const activeOption = document.querySelector('.places__option--active');
    expect(activeOption).toHaveTextContent('Price: low to high');
  });

  it('should close dropdown when clicking outside', () => {
    vi.mocked(useAppSelector).mockReturnValue(SortType.Popular);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <Sort />
      </Provider>
    );

    const sortTypeElement = document.querySelector('.places__sorting-type');
    const dropdownList = document.querySelector('.places__options');

    expect(dropdownList).not.toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement!);
    expect(dropdownList).toHaveClass('places__options--opened');

    fireEvent.click(sortTypeElement!);
    expect(dropdownList).not.toHaveClass('places__options--opened');
  });
});
