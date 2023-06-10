import React from 'react'
import './Nav.scss'
import logo from "../../assets/DEV.png"
import { AiOutlineMenu } from 'react-icons/ai';
import Search from '../Search/Search'
import GuestNavLink from './NavLinks/GuestNavLink'
import LoggedNavLink from './NavLinks/LoggedNavLink'
import {useSelector, useDispatch} from 'react-redux'
import {UIActions} from '../../store/slices/UiSlice'
function Header() {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  return (
    <nav className='nav'>
      {/* left */}
      <div className='nav-left'>
      <button onClick={() => {
        document.body.style.overflow = 'hidden';
        dispatch(UIActions.toggleHamburger())
      }} className='nav-left__menu'><AiOutlineMenu size={23}/></button>
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