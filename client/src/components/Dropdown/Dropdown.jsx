import React, { useRef, useEffect } from 'react';
import './Dropdown.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { UIActions } from '../../store/slices/UiSlice';

function Dropdown() {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { current_user } = useSelector((state) => state.auth);
  const handleItemClick = () => {
    dispatch(UIActions.toggleDropdown(false));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.id !== 'profileRef') {
        dispatch(UIActions.toggleDropdown(false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='dropdown-container'>
    <motion.div
      id='dropdown'
      className='dropdown'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      ref={dropdownRef}
    >
      <ul>
        <li className='user-profile-link' onClick={handleItemClick}>
          <Link to={`/${current_user._id}`}>
            <span>{current_user.name || current_user.username}</span>
            <small>@{current_user.username}</small>
          </Link>
        </li>
        <li onClick={handleItemClick}>
          <Link to={'/new'}>Create Post</Link>
        </li>
        <li onClick={handleItemClick}>
          <Link to={'/user/readinglist'}>Reading List</Link>
        </li>
        <li onClick={handleItemClick}>
          <Link to={`/user/${current_user?._id}/settings`}>Settings</Link>
        </li>
        <li className='signout-link' onClick={handleItemClick}>
          <Link to={'/signout'}>Sign Out</Link>
        </li>
      </ul>
    </motion.div>
    </div>
  );
}

export default Dropdown;
