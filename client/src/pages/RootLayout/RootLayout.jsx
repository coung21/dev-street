import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Header';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import PopupSidebar from '../../components/Sidebar/PopupSidebar/PopupSidebar';
import { useSelector } from 'react-redux';
import {AnimatePresence} from 'framer-motion'
import Toaster from '../../components/Toaster/Toaster';
import {useLocation} from 'react-router-dom'


function RootLayout() {
  const location = useLocation()
  useEffect(() => {
    const root = document.getElementById('root')
    if(location.pathname === '/new'){
      root.style.paddingTop = '0'
    } else {
      root.style.paddingTop = '56px'
    }
  }, [location])
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
          {location.pathname !== '/new' ? (
            <>
              <Nav />
              <div className='layout'>
                <Outlet />
              </div>
              <Footer />
            </>
          ) : (
            <>
              <div className='layout'>
                <Outlet />
              </div>
            </>
          )}
          <AnimatePresence>
            {error && <Toaster message={message} success={false} />}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default RootLayout;
