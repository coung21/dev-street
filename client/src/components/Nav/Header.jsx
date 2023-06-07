import React from 'react'
import './Nav.scss'
import logo from "../../assets/DEV.png"
import Search from '../Search/Search'
import GuestNavLink from './NavLinks/GuestNavLink'
import LoggedNavLink from './NavLinks/LoggedNavLink'
import {useSelector} from 'react-redux'
function Header() {
  const {user} = useSelector(state => state.auth)
  return (
    <nav className='nav'>
      {/* left */}
      <div className='nav-left'>
        <img src={logo} className='nav-left__logo' alt='logo' />
        <Search />
      </div>
      {/* right */}
      <div className='nav-right'>
        {!user ? <GuestNavLink /> : <LoggedNavLink user={user}/>}
      </div>
    </nav>
  );
}

export default Header