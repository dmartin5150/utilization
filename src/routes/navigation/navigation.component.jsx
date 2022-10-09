import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.scss";

const Navigation = () => {
  return (
    <Fragment>
      <nav className="nav">
        <div className="nav__ascension-logo">
          <img src="./ascension.png" alt="Ascension logo" />
        </div>
        <div className="nav__seamless-logo">Seamless Transitions Application</div>

        <div className="nav__links-container">
          <Link className="nav__link" to="/physician">
            Physician
          </Link>
          <Link className="nav__link" to="/">
            Patient
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
