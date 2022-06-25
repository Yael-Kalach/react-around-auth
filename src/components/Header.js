import logo from '../images/header-assets/logo.svg'
import { NavLink } from 'react-router-dom';

function Header(props) {
  return(
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the U.S. Logo" />
      <div>
        <NavLink to="/" className="header__link"></NavLink>
        {props.isLoggedIn ? <p>{props.userEmail}</p> : ''}
      </div>
    </header>
  )
}

export default Header;