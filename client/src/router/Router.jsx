import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/RootLayout/RootLayout';
import SignUp from '../pages/Enter/SignUp';
import PrivateRoutes from './PrivateRoutes';
import Home from '../pages/Home/Home';
import SignIn from '../pages/Enter/SignIn';
import SuccessPage from '../pages/SuccesPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <PrivateRoutes />,
        children: [{ index: true, element: <Home /> }],
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '/success',
    element: <SuccessPage />
  }
]);

export default router;
