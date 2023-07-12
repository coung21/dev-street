import React from 'react';
import './MainNavigation.scss';
import {
  FcHome,
  FcRules,
  FcPackage,
  FcIdea,
  FcAbout,
  FcContacts,
} from 'react-icons/fc';

import {
  BsTwitter,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsReddit,
  BsLinkedin,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import FollowingTag from '../../FollowingTag/FollowingTag';
function MainNavigation() {
  const {current_user} = useSelector(state => state.auth)
  function handleNavigate() {
    dispatch(UIActions.toggleHamburger());
    document.body.style.overflow = 'auto';
  }
  return (
    <>
      <ul style={{ marginBottom: '1rem' }}>
        <li>
          <Link to={'/'} className='sidebar-link' onClick={handleNavigate}>
            <span className='sidebar-link__icon'>
              <FcHome size={20} />
            </span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to={'/user/readinglist'}
            className='sidebar-link'
            onClick={handleNavigate}
          >
            <span className='sidebar-link__icon'>
              <FcRules size={20} />
            </span>
            <span>Reading List</span>
          </Link>
        </li>
        <li>
          <Link to={'/tags'} className='sidebar-link' onClick={handleNavigate}>
            <span className='sidebar-link__icon'>
              <FcPackage size={20} />
            </span>
            <span>Tags</span>
          </Link>
        </li>
        <li>
          <Link
            to={'/example'}
            className='sidebar-link'
            onClick={handleNavigate}
          >
            <span className='sidebar-link__icon'>
              <FcIdea size={20} />
            </span>
            <span>FAQ</span>
          </Link>
        </li>
        <li>
          <Link
            to={'/example'}
            className='sidebar-link'
            onClick={handleNavigate}
          >
            <span className='sidebar-link__icon'>
              <FcAbout size={20} />
            </span>
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link
            to={'/example'}
            className='sidebar-link'
            onClick={handleNavigate}
          >
            <span className='sidebar-link__icon'>
              <FcContacts size={20} />
            </span>
            <span>Contact</span>
          </Link>
        </li>
      </ul>

      <div className='social'>
        <a href='https://twitter.com/dcoung21'>
          <BsTwitter size={20} />
        </a>
        <a href='https://www.facebook.com/coung.wt/'>
          <BsFacebook size={20} />
        </a>
        <a href='https://github.com/coung21'>
          <BsGithub size={20} />
        </a>
        <a href='https://www.instagram.com/coung21/'>
          <BsInstagram size={20} />
        </a>
        <a href='https://www.reddit.com/user/Rich-Tomorrow-2948'>
          <BsReddit size={20} />
        </a>
        <a href='https://www.linkedin.com/in/cuong-cong-duong-613279262/'>
          <BsLinkedin size={20} />
        </a>
      </div>
      {current_user && <FollowingTag />}
    </>
  );
}

export default MainNavigation;
