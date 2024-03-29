import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Header';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import PopupSidebar from '../../components/Sidebar/PopupSidebar/PopupSidebar';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import Toaster from '../../components/Toaster/Toaster';
import { useLocation } from 'react-router-dom';
import AuthModal from '../../components/Modal/AuthModal';

function RootLayout() {
  const location = useLocation();
  const { loading, error, message } = useSelector(
    (state) => state.loadingError
  );

  useEffect(() => {
    const root = document.getElementById('root');
    if (
      location.pathname === '/new' ||
      location.pathname.endsWith('/edit') ||
      location.pathname === '/example' ||
      location.pathname === '/password/new/reset' ||
      location.pathname === '/password/new/otp'
    ) {
      root.style.paddingTop = '0';
    } else {
      root.style.paddingTop = '56px';
    }
    window.scrollTo(0, 0);
  }, [location]);
  // console.log(isLoading)
  const { hamburger, authModal } = useSelector((state) => state.Ui);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {hamburger && <PopupSidebar />}
          {location.pathname !== '/example' &&
          location.pathname !== '/new' &&
          !location.pathname.includes('/password/new/') &&
          !location.pathname.endsWith('/edit') ? (
            <>
              <Nav />
              <div className='layout'>
                <Outlet />
              </div>
              {/* <Footer /> */}
            </>
          ) : (
            <>
              <Outlet />
            </>
          )}
          {authModal && <AuthModal />}
          <AnimatePresence>
            {error && <Toaster message={message} success={false} />}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default RootLayout;
