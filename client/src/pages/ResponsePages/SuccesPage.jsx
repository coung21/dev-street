import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const SuccessPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get('accessToken');
    const refreshToken = queryParams.get('refreshToken');
    const userData = queryParams.get('userData');

    // Sử dụng dữ liệu trong ứng dụng của bạn
    // console.log('Access Token:', accessToken);
    // console.log('Refresh Token:', refreshToken);
    // console.log('User Data:', userData);

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('user', userData)

    const timeout = setTimeout(() => {
      navigate('/')
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, []);

  return <h1>Success Page</h1>;
};

export default SuccessPage;
