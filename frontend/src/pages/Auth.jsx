/**
 * Auth Page
 */

// Dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import backend from '../utils/axios';
import { isEmail } from 'validator/validator';
import logo from '../assets/logo.jpg';
import '../css/Auth.css';

// Material UI
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

// Actions
import { showSnackbar, disableLoading, enableLoading } from '../store/features/app';
import { login } from '../store/features/user';

function Auth() {
  const dispatch = useDispatch();
  const [pageAction, setPageAction] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) throw new Error('Username or email and password are required');
      dispatch(enableLoading());
      const data = {
        [isEmail(username) ? 'email' : 'username']: username,
        password,
      };
      const response = await backend({ url: '/api/user/login', method: 'post', data });
      dispatch(showSnackbar({ type: 'success', message: 'Login Successful' }));
      dispatch(login(response.data.user));
    } catch (error) {
      dispatch(showSnackbar({ message: error.message }));
    } finally {
      dispatch(disableLoading());
    }
  };

  const handleRequestResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (!username) throw new Error('Username or email is required');
      dispatch(enableLoading());
      // TODO: API call to send an email if account exists
    } catch (error) {
      dispatch(showSnackbar({ message: error.message }));
    } finally {
      dispatch(disableLoading());
    }
  }

  const handleUsernameState = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordState = (e) => {
    setPassword(e.target.value);
  };

  const handlePageAction = (action) => () => {
    setPageAction(action);
    setUsername('');
    setPassword('');
  }

  return (
    <div>
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="AICTE Logo" />
        </div>
        {
          pageAction === 'login' ?
            (
              <>
                <div className="text-center mt-4 text-xl" >Login</div>
                <form className="p-3 mt-3" onSubmit={handleLoginUser}>
                  <div className="form-field flex items-center">
                    <PersonIcon />
                    <input type="text" value={username}
                      name="userName" id="userName" placeholder="Username or Email" onChange={handleUsernameState} />
                  </div>
                  <div className="form-field flex items-center">
                    <KeyIcon />
                    <input type="password" value={password}
                      name="password" id="pwd" placeholder="Password" onChange={handlePasswordState} />
                  </div>
                  <button className="btn mt-3" type='submit'>Login</button>
                </form>
                <div className="text-center fs-6"> <span className='cursor-pointer hover:underline' onClick={handlePageAction('password')}>Forget password?</span></div>
              </>
            )
            :
            (
              <>
                <div className="text-center mt-4 text-xl" >Forgot Password</div>
                <form className="p-3 mt-3" onSubmit={handleRequestResetPassword}>
                  <div className="form-field flex items-center">
                    <PersonIcon />
                    <input type="text" value={username}
                      name="userName" id="userName" placeholder="Username or Email" onChange={handleUsernameState} />
                  </div>
                  <button className="btn mt-3" type='submit' >Request Email</button>
                </form>
                <div className="text-center fs-6"> Have an account? <span className='cursor-pointer hover:underline' onClick={handlePageAction('login')}>Login</span></div>
              </>
            )
        }
      </div>
    </div>
  )
}

export default Auth;