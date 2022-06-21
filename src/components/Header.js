import logo from '../images/header-assets/logo.svg'
import { Link } from 'react-router-dom';

function Header() {
  return(
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the U.S. Logo" />
      <Link to="/register" className="header__link"></Link>
    </header>
  )
}

export default Header;