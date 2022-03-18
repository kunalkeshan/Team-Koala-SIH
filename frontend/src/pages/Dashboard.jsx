/**
 * Dashboard Page
 */

// Dependencies
import React from 'react'
import { useDispatch } from 'react-redux'
import backend from '../utils/axios';

// Actions
import { logout } from '../store/features/user';
import { showSnackbar, enableLoading, disableLoading } from '../store/features/app';

function Dashboard() {
    const dispatch = useDispatch();
    const handleUserLogout = async () => {
        try {
            dispatch(enableLoading());
            await backend({ url: '/api/user/logout', method: 'post' });
            dispatch(showSnackbar({ message: 'Logout successful', type: 'success' }));
        } catch (error) {
            dispatch(showSnackbar({ message: error.message }));
        } finally {
            dispatch(logout());
            dispatch(disableLoading());
        }
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleUserLogout}>Logout</button>
        </div>
    )
}

export default Dashboard;