import React from 'react'
import '../Nav/Nav.scss'
import { BiSearch } from 'react-icons/bi';


function Search() {
  return (
    <div className='nav-left__search'>
      <input type='text' placeholder='Search...' />
      <BiSearch className='nav-left--icon' />
    </div>
  );
}

export default Search