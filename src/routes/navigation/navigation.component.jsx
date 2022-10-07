import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <nav className="nav">
        <div className="nav__logos-container">
          <div className="nav__a-logo-container">
            <div className="nav__ascension-logo">Ascension-logo</div>
          </div>
          <div className="nav__seamless-logo">Seamless Logo</div>
        </div>
        <div className="nav__links-container">
            <Link className="nav__link" to='/physician'>Physician</Link>
            <Link className="nav__link" to='/'>Patient</Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
