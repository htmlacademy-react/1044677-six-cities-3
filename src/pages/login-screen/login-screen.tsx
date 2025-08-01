import { Helmet } from 'react-helmet-async';
import { getRandomCity } from '../../utils';
import Logo from '../../components/logo/logo';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { FormEvent, useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeCity } from '../../store/app-process/app-process.slice';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

function LoginScreen(): JSX.Element | null {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [passwordError, setPasswordError] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [randomCity, setRandomCity] = useState(getRandomCity());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setRandomCity(getRandomCity());
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  const validatePassword = (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasLetter || !hasNumber) {
      setPasswordError('Password must contain at least one letter and one number');
      setIsPasswordValid(false);
      return false;
    }

    setPasswordError('');
    setIsPasswordValid(true);
    return true;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const password = passwordRef.current.value;

      if (!validatePassword(password)) {
        return;
      }

      dispatch(loginAction({
        login: loginRef.current.value,
        password: password
      }))
        .unwrap()
        .then(() => {
          navigate(AppRoute.Main);
        })
        .catch(() => {
          setHasError(true);
        });
    }
  };

  const handleRandomCityClick = () => {
    dispatch(changeCity(randomCity));
    navigate(AppRoute.Main);
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return null;
  }

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#" method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              {!isPasswordValid && passwordError && (
                <div className="login__error">
                  {passwordError}
                </div>
              )}
              {hasError && (
                <div className="login__error">
                  {hasError}
                </div>
              )}
              <button
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button
                className="locations__item-link"
                type="button"
                onClick={handleRandomCityClick}
              >
                <span>{randomCity.title}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
