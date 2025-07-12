import { useAppSelector } from '../../hooks/store';
import { getHasError } from '../../store/app-process/app-process.selectors';

function ErrorMessage(): JSX.Element | null {
  const hasError = useAppSelector(getHasError);

  return (hasError)
    ? <div className='error-message'>{hasError}</div>
    : null;

}

export default ErrorMessage;
