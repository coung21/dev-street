import React from 'react';
import './Nav.scss';
import logo from '../../assets/DEV.png';
import { AiOutlineMenu } from 'react-icons/ai';
import Search from '../InputElements/Search/Search';
import GuestNavLink from './NavLinks/GuestNavLink';
import LoggedNavLink from './NavLinks/LoggedNavLink';
import { useSelector, useDispatch } from 'react-redux';
import { UIActions } from '../../store/slices/UiSlice';
import Dropdown from '../Dropdown/Dropdown';
import { Link } from 'react-router-dom';
function Header() {
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.auth);
  const { dropdown } = useSelector((state) => state.Ui);
  return (
    <div className='nav-container'>
      <nav className='nav'>
        {/* left */}
        <div className='nav-left'>
          <button
            onClick={() => {
              document.documentElement.style.overflowY = 'hidden';
              document.getElementById('left-navigation').style.display =
                'block';
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
          {!current_user ? (
            <GuestNavLink />
          ) : (
            <LoggedNavLink user={current_user} />
          )}
        </div>
      </nav>
      {dropdown && <Dropdown />}
    </div>
  );
}

export default Header;
