import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RootLayout from '../pages/RootLayout'
import SignUp from '../pages/SignUp/SignUp'
function Router() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route path='/signup' element={<SignUp />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router