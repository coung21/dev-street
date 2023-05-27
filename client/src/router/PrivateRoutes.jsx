import React, {useEffect} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PrivateRoutes() {
   const { authData } = useAuth();
  return (
    <>{authData.accessToken && authData.refreshToken ? <Outlet /> : <Navigate to={'/signin'} />}</>
  )
}

export default PrivateRoutes