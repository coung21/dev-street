import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.scss'
import logo from "../../assets/DEV.png"
import {BiSearch} from 'react-icons/bi'

function Header() {
  return (
    <nav className='nav'>
      {/* left */}
      <div className='nav-left'>
        <img src={logo} className='nav-left__logo' alt='logo' />
        <div className='nav-left__search'>
          <input type='text' placeholder='Search...' />
          <BiSearch className='nav-left--icon' />
        </div>
      </div>

      {/* right */}
      <div className='nav-right'>
        <Link to={'/signin'}>
          <button className='btn btn--secondary'>Sign in</button>
        </Link>
        <Link to={'signup'}>
          <button className='btn btn--primary'>Sign up</button>
        </Link>
      </div>
    </nav>
  );
}

export default Header