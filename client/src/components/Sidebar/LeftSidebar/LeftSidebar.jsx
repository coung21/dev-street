import React from 'react';
import './LeftSidebar.scss';
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

function LeftSidebar() {
  return (
    <aside className='sidebar-wrapper-left'>
      <ul style={{ marginBottom: '1rem' }}>
        <li>
          <Link className='sidebar-link'>
            <span className='sidebar-link__icon'>
              <FcHome size={20} />
            </span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link className='sidebar-link'>
            <span className='sidebar-link__icon'>
              <FcRules size={20} />
            </span>
            <span>Reading List</span>
          </Link>
        </li>
        <li>
          <Link className='sidebar-link'>
            <span className='sidebar-link__icon'>
              <FcPackage size={20} />
            </span>
            <span>Tags</span>
          </Link>
        </li>
        <li>
          <Link className='sidebar-link'>
            <span className='sidebar-link__icon'>
              <FcIdea size={20} />
            </span>
            <span>FAQ</span>
          </Link>
        </li>
        <li>
          <Link className='sidebar-link'>
            <span className='sidebar-link__icon'>
              <FcAbout size={20} />
            </span>
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link className='sidebar-link'>
            <span className='sidebar-link__icon'>
              <FcContacts size={20} />
            </span>
            <span>Contact</span>
          </Link>
        </li>
      </ul>

      <div className='social'>
        <a href=""><BsTwitter size={20}/></a>
        <a href=""><BsFacebook size={20}/></a>
        <a href=""><BsGithub size={20}/></a>
        <a href=""><BsInstagram size={20}/></a>
        <a href=""><BsReddit size={20}/></a>
        <a href=""><BsLinkedin size={20}/></a>
      </div>
    </aside>
  );
}

export default LeftSidebar;