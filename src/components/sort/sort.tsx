import { memo, useState } from 'react';
import { SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeSortType } from '../../store/app-process/app-process.slice';
import { getSortType } from '../../store/app-process/app-process.selectors';

function Sort(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(getSortType);

  const handleSortClick = () => setIsOpen(!isOpen);

  const handleSortTypeClick = (type: SortType) => {
    dispatch(changeSortType(type));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortClick}
        data-testid="sorting-type"
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}
        data-testid="sorting-options"
      >
        <li
          className={`places__option ${currentSort === SortType.Popular ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => handleSortTypeClick(SortType.Popular)}
        >
          Popular
        </li>
        <li
          className={`places__option ${currentSort === SortType.PriceLowToHigh ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => handleSortTypeClick(SortType.PriceLowToHigh)}
        >
          Price: low to high
        </li>
        <li
          className={`places__option ${currentSort === SortType.PriceHighToLow ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => handleSortTypeClick(SortType.PriceHighToLow)}
        >
          Price: high to low
        </li>
        <li
          className={`places__option ${currentSort === SortType.TopRated ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => handleSortTypeClick(SortType.TopRated)}
        >
          Top rated first
        </li>
      </ul>
    </form>
  );
}

export default memo(Sort);
