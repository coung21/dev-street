import React from 'react';
import Router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import SocketProvider from './contexts/SocketContext';

function App() {
  const { router } = Router();
  return (
    <>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </>
  );
}

export default App;
