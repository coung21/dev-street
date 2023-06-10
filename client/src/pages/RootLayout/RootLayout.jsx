import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Header';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import PopupSidebar from '../../components/Sidebar/PopupSidebar/PopupSidebar';
import { useDispatch, useSelector } from 'react-redux';

function RootLayout() {
  const isLoading = useSelector((state) => state.loadingError.loading);
  const hamburger = useSelector((state) => state.Ui.hamburger)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {hamburger && <PopupSidebar />}
          <Nav />
          <div className='layout'>
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default RootLayout;
