import React from 'react';
import { Link } from 'react-router-dom';
import '../Nav.scss';
import { BiBell } from 'react-icons/bi';

function LoggedNavLink({user}) {
  return (
    <>
      <Link>
        <button className='btn btn--primary'>Create Post</button>
      </Link>
      <Link>
        <button className='btn--notification'>
          <BiBell size={25}/>
        </button>
      </Link>
      <button className='btn--profile'>
        <img src={user.avatar} alt="" />
      </button>
    </>
  );
}

export default LoggedNavLink;
