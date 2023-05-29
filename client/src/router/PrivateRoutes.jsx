import React, {useEffect} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PrivateRoutes() {
   const { authData } = useAuth();
  //  console.log(authData.user)
  return (
    <>{authData.user ? <Outlet /> : <Navigate to={'/signin'} />}</>
  )
}

export default PrivateRoutes