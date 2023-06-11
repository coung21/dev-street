import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Header';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import PopupSidebar from '../../components/Sidebar/PopupSidebar/PopupSidebar';
import { useSelector } from 'react-redux';
import {AnimatePresence} from 'framer-motion'
import Toaster from '../../components/Toaster/Toaster';

function RootLayout() {
  const {loading, error, message} = useSelector((state) => state.loadingError);
  // console.log(isLoading)
  const hamburger = useSelector((state) => state.Ui.hamburger)
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {hamburger && <PopupSidebar />}
          <Nav />
          
          <div className='layout'>
            <Outlet />
          </div>
          <Footer />
          <AnimatePresence>
            {error && <Toaster message={message} success={false} />}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default RootLayout;
