import React, {useEffect, useState} from 'react';
import './Loading.scss';
import { authActions } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { google } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';

function GoogleLoading() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    const googleAuth = async () => {
      try {
        const response = await google();
        localStorage.setItem('current_user', JSON.stringify(response.data));
        dispatch(authActions.googleAuth(response.data));
        // console.log(response);
        navigate('/')
      } catch (error) {
        console.log('loi dang nhap gg');
      }
    };
    if (!localStorage.getItem('current_user')) {
      googleAuth();
    } else {
      console.log('login r');
    }
  }, [google, authActions]);
  return (
    <div className='loader-container'>
      <div className='loader'>
        <div className='circle blue-dot'></div>
        <div className='circle red-dot'></div>
        <div className='circle yellow-dot'></div>
        <div className='circle green-dot'></div>
      </div>
    </div>
  );
}

export default GoogleLoading;
