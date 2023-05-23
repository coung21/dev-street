import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from '../components/Nav/Nav'

function Router() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router