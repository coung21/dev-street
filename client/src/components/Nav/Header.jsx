import React from 'react';
import './Nav.scss';
import logo from '../../assets/DEV.png';
import { AiOutlineMenu } from 'react-icons/ai';
import Search from '../Search/Search';
import GuestNavLink from './NavLinks/GuestNavLink';
import LoggedNavLink from './NavLinks/LoggedNavLink';
import { useSelector, useDispatch } from 'react-redux';
import { UIActions } from '../../store/slices/UiSlice';
import Dropdown from '../Dropdown/Dropdown';
import { Link } from 'react-router-dom';
function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { dropdown } = useSelector((state) => state.Ui);
  return (
    <div className='nav-container'>
      <nav className='nav'>
        {/* left */}
        <div className='nav-left'>
          <button
            onClick={() => {
              document.body.style.overflow = 'hidden';
              dispatch(UIActions.toggleHamburger());
            }}
            className='nav-left__menu'
          >
            <AiOutlineMenu size={23} />
          </button>
          <Link to={'/'}>
            <img src={logo} className='nav-left__logo' alt='logo' />
          </Link>
          <Search />
        </div>
        {/* right */}
        <div className='nav-right'>
          {!user ? <GuestNavLink /> : <LoggedNavLink user={user} />}
        </div>
      </nav>
      {dropdown && <Dropdown />}
    </div>
  );
}

export default Header;
