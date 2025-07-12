import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector((state) => state[NameSpace.User].authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to = {AppRoute.Login}/>
  );
}

export default PrivateRoute;
