/**
 * Application Routes
 */

// Dependencies
import React from 'react';
import {Routes, Route} from 'react-router-dom';

// Pages
import Auth from '../pages/Auth';

function AppRoutes() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Auth />} />
        </Routes>
    </>
  )
}

export default AppRoutes