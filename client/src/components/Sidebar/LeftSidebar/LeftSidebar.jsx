import React from 'react';
import './LeftSideBar.scss';
import MainNavigation from '../../Nav/MainNavigation/MainNavigation';

function LeftSidebar() {
  return (
    <aside className='sidebar-wrapper-left'>
      <MainNavigation />
    </aside>
  );
}

export default LeftSidebar;
