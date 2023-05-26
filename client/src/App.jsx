import React from 'react';
import router from './router/Router';
import {RouterProvider} from 'react-router-dom'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
