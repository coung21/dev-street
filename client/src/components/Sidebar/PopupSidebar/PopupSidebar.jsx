import React from 'react';
import { createPortal } from 'react-dom';
import './PopupSidebar.scss';
import { IoClose } from 'react-icons/io5';
import MainNavigation from '../../Nav/MainNavigation/MainNavigation';
import { useDispatch } from 'react-redux';
import { UIActions } from '../../../store/slices/UiSlice';
function PopupSidebar() {
  const dispatch = useDispatch();
  return createPortal(
    <div
      className='sidebar-popup'
      onClick={() => {
        dispatch(UIActions.toggleHamburger());
        document.documentElement.style.overflowY = 'auto';
        document.getElementById('modal').style.display = 'none';
      }}
    >
      <aside
        className='popup-nav'
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <header className='popup-nav__header'>
          <h2>Dev Street</h2>
          <button
            onClick={() => {
              dispatch(UIActions.toggleHamburger());
              document.documentElement.style.overflowY = 'auto';
              document.getElementById('modal').style.display = 'none';
            }}
            className='close'
          >
            <IoClose size={25} />
          </button>
        </header>
        <div className='popup-nav__body'>
          <MainNavigation />
        </div>
      </aside>
    </div>,
    document.getElementById('modal')
  );
}

export default PopupSidebar;
