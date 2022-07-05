import React from 'react';
import logo from '../images/header-assets/logo.svg'
import {  NavLink, useLocation } from 'react-router-dom';

function Header(isLoggedIn, logout, email) {
  const { pathname } = useLocation();

  function handleLoggingOut(){
    logout()
  }

  return(
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the U.S. Logo" />
      <div className="header__nav">
        {(isLoggedIn && pathname === "/main") ? (
          <button onClick={handleLoggingOut} className="header__link">Log out</button>) 
          : (pathname === '/signin' ? 
            <NavLink to="/signup" className="header__link">Sign up</NavLink> 
          : <NavLink to="/signin" className="header__link">Log in</NavLink>)}
        {isLoggedIn ? <p>{email}</p> : ''}
      </div>
    </header>
  )
}

export default Header;