import { useAppSelector } from '../../hooks/store';
import { getError } from '../../store/app-process/app-process.selectors';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
