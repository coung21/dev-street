import React, { useEffect, useState } from 'react';
import './Home.scss';
import LeftSidebar from '../../components/Sidebar/LeftSidebar/LeftSidebar';
import { authActions } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { google } from '../../api/userApi';
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const googleAuth = async () => {
      try {
        const response = await google();
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch(authActions.googleAuth(response.data));
        console.log(response);  
      } catch (error) {
        console.log('loi dang nhap gg');
      }
    };
    if(!localStorage.getItem('user')){
      googleAuth();
    } else {
      console.log('login r')
    }
  }, [google, authActions]);
  return (
    <div className='home-layout'>
      <LeftSidebar />
    </div>
  );
}

export default Home;
