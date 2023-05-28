import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

function RootLayout() {
  return (
    <>
      <Nav />
      <div className='layout'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
