import { store } from '../store';
import { clearErrorAction } from '../store/api-actions';
import { setHasError } from '../store/app-process/app-process.slice';

export const processErrorHandle = (): void => {
  store.dispatch(setHasError(true));
  store.dispatch(clearErrorAction());
};
