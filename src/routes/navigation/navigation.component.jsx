import { Fragment } from "react";
import { Outlet, NavLink} from "react-router-dom";
import "./navigation.scss";

const Navigation = () => {
  return (
    <Fragment>
      <nav className="nav">
        <div className="nav__ascension-logo">
          <img src="./ascension.png" alt="Ascension logo" />
          {/* <div className="nav__clincialstudio">
            <p className="nav__clinicalstudio--text">Clinical Studio</p>
          </div> */}
        </div>

        <div className="nav__seamless-logo">
          Seamless Transitions Data
        </div>

        <div className="nav__links-container">
          <NavLink  to="/physician" className="nav__link" >
            Physician
          </NavLink>
          <NavLink  to="/" className="nav__link"
          >
            Patient
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
