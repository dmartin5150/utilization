import React, { Fragment } from "react";
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
          SSM OR Control Center
        </div>

        <div className="nav__links-container">
          <NavLink  
           style={
            ({isActive}) => (
             isActive 
             ? {
                textDecoration: 'none',
                color: '#00a896'
               }
             :{}
             )
           }
           to="/" className="nav__link" >
            OR Data
          </NavLink>
          <NavLink  
              style={
              ({isActive}) => (
                isActive 
                ? {
                  textDecoration: 'none',
                  color: '#00a896'
                  }
                :{}
                )
              }
          to="/surgeon" className="nav__link">
            Surgeon
          </NavLink>
          <NavLink  
              style={
              ({isActive}) => (
                isActive 
                ? {
                  textDecoration: 'none',
                  color: '#00a896'
                  }
                :{}
                )
              }
          to="/block" className="nav__link">
            Block
          </NavLink>
          <NavLink  
            style={
            ({isActive}) => (
              isActive 
              ? {
                textDecoration: 'none',
                color: '#00a896'
                }
              :{}
              )
            }
          to="/settings" className="nav__link">
            Settings
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
