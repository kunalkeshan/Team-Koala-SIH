/**
 * Application Routes
 */

// Dependencies
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages
import Auth from '../pages/Auth';

// Components


function AppRoutes() {
  const { user } = useSelector((state) => state.user.value);

  const CheckAuthState = () => {
    return !user ? <Auth /> : <Navigate to='/dashboard' />
  }

  const CheckUserState = () => {
    return user ? <div /> : <Navigate to='/' />
  }


  return (
    <>
      <Routes>
        <Route path='/' element={<CheckAuthState />} />
        <Route path='/dashboard' element={<CheckUserState />}>

        </Route>
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
    </>
  )
}

export default AppRoutes