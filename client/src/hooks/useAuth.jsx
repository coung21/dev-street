import React, { } from 'react';

function useAuth() {
  const authData = {
    user: localStorage.getItem('user'),
  }
  return { authData };
}

export default useAuth;
