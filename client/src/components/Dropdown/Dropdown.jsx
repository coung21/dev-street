import React from 'react';
import './Dropdown.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Dropdown() {
  return (
    <motion.div
      className='dropdown'
      initial={{ opacity: 0,}}
      animate={{ opacity: 1,}}
      exit={{ opacity: 0,}}
      transition={{ duration: 0.15 }}
    >
      <ul>
        <li className='user-profile-link'>
          <Link>
            <span>Duong COng cuong</span>
            <small>@cuong</small>
          </Link>
        </li>
        <li>
          <Link>Create Post</Link>
        </li>
        <li>
          <Link>Reading List</Link>
        </li>
        <li>
          <Link>Settings</Link>
        </li>
        <li className='signout-link'>
          <Link>Sign Out</Link>
        </li>
      </ul>
    </motion.div>
  );
}

export default Dropdown;
