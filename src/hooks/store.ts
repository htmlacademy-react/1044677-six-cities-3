import { store } from '../store/index';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '../types/store';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => typeof store = useStore;
