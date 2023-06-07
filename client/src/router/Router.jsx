import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/RootLayout/RootLayout';
import SignUp from '../pages/Enter/SignUp';
import Home from '../pages/Home/Home';
import SignIn from '../pages/Enter/SignIn';
import {useSelector} from 'react-redux'

function Router(){
  const {user} = useSelector(state => state.auth)
  let routes;
  if(user) {
    routes = [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ]
  } else {
    routes = [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ]
  }
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes
  },
]);
  return {router}
}

export default Router;
