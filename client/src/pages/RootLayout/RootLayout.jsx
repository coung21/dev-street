import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';

function RootLayout() {
  const isLoading = useSelector((state) => state.loadingError.loading);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
