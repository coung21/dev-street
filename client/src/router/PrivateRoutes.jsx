import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

function PrivateRoutes() {
  const auth = false
  return (
    <>{auth ? <Outlet /> : <Navigate to={'/signin'} />}</>
  )
}

export default PrivateRoutes