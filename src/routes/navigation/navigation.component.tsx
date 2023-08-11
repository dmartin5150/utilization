import React, { Fragment } from "react";
import { Outlet, NavLink} from "react-router-dom";
import "./navigation.scss";


const Navigation = () => {


  return (
    <Fragment>
      <nav className="nav">
        <div className="nav__ascension-logo">
          <img src="./ascension.png" alt="Ascension logo" />
        </div>

        <div className="nav__seamless-logo">
          SSM OR Control Center
        </div>

        <div className="nav__links-container">
          {/* <NavLink  
           style={
            ({isActive}) => (
              isActive 
              ? {
                textDecoration: 'none',
                color: '#1b4297'
                }
              :{}
              )
           }
           to="/" className="nav__link" >
            OR Data
          </NavLink> */}
          <NavLink  className="nav__link"
            style={
              ({isActive}) => (
                isActive 
                ? {
                  textDecoration: 'none',
                  color: '#1b4297'
                  }
                :{}
                )}
            to="/" end>OR Data</NavLink>
          <NavLink  
              style={
              ({isActive}) => (
                isActive 
                ? {
                  textDecoration: 'none',
                  color: '#1b4297'
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
                  color: '#1b4297'
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
                color: '#1b4297'
                }
              :{}
              )
            }
          to="/opentimes" className="nav__link">
            Open Times
          </NavLink>
          <NavLink  
            style={
            ({isActive}) => (
              isActive 
              ? {
                textDecoration: 'none',
                color: '#1b4297'
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
