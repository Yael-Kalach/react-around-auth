import logo from '../images/header-assets/logo.svg'
import {  NavLink, useLocation } from 'react-router-dom';

function Header(props) {
  const { pathname } = useLocation();

  return(
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the U.S. Logo" />
      <div className="header__nav">
        {props.isLoggedIn ? (
          <button onClick={props.logout} className="header__link">Log out</button>) 
          : (pathname === '/signin' ? 
          <NavLink to="/signup" className="header__link">Sign up</NavLink> 
          : <NavLink to="/signin" className="header__link">Log in</NavLink>)}
        {props.isLoggedIn ? <p>{props.email}</p> : ''}
      </div>
    </header>
  )
}

export default Header;