import React, { useEffect, useState } from 'react';
import './Home.scss';
import LeftSidebar from '../../components/Sidebar/LeftSidebar/LeftSidebar';
import PostItem from '../../components/PostItem/PostItem';
function Home() {
  return (
    <>
      <div className='home-layout'>
        <LeftSidebar />
        <div>
          <PostItem />
        </div>
        <div>
          a
        </div>
      </div>
    </>
  );
}

export default Home;
