import React, { } from 'react';

function useAuth() {
  const authData = {
    user: localStorage.getItem('user'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  }
  return { authData };
}

export default useAuth;
