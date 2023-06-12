import React from 'react'
import { Link } from 'react-router-dom';
import '../Nav.scss'

function GuestNavLink() {
  return (
    <>
      <Link to={'/signin'}>
        <button className='btn btn--secondary'>Sign in</button>
      </Link>
      <Link to={'/signup'}>
        <button className='btn btn--primary'>Sign up</button>
      </Link>
    </>
  );
}

export default GuestNavLink