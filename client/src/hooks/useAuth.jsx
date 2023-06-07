import React, { useEffect, useState } from 'react';

function useAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
      if(user){
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    })
  return { user, isLogin };
}

export default useAuth;
