import { memo } from 'react';

function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <a className="footer__logo-link" href="#">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </a>
    </footer>
  );
}

export default memo(Footer);
