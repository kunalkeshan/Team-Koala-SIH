import React, {useState, useEffect} from 'react';
import logo from '../assets/logo.jpg';
import '../css/Auth.css';
import backend from '../utils/axios';
import { useDispatch } from 'react-redux';

// Actions
import {hideSnackbar, showSnackbar, disableLoading, enableLoading} from '../store/features/app'

function Auth() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  // useEffect(() => {
  //   dispatch(showSnackbar({type: 'success', message: 'Login Successfull'}))
  // }, [])

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(enableLoading())
      const user = await backend({url: '/api/user/login', method: 'post', data: {email: username, password}});
      dispatch(showSnackbar({type: 'success', message: 'Login Successfull'}))
      console.log(user)
    } catch (error) {
      console.log(error)
      dispatch(showSnackbar({message: error.message}))
    } finally {
      dispatch(disableLoading())
    }
  };

  const handleUsernameState = (e) => {
    setUsername(e.target.value);
    if(username.length > 0 && password.length > 0) setDisabled(false);
  };

  const handlePasswordState = (e) => {
    setPassword(e.target.value);
    if(username.length > 0 && password.length > 0) setDisabled(false);
  };

  return (
    <div>
        <div className="wrapper">
            <div className="logo"> 
              <img src={logo} alt="AICTE Logo" /> 
            </div>
            <div className="text-center mt-4" >User Authentication</div>
            <form className="p-3 mt-3" onSubmit={loginUser}>
                <div className="form-field d-flex align-items-center"> 
                  <span className="far fa-user"></span> 
                  <input type="text"
                        name="userName" id="userName" placeholder="Username" onChange={handleUsernameState}/> 
                </div>
                <div className="form-field d-flex align-items-center"> 
                  <span className="fas fa-key"></span> 
                  <input type="password"
                        name="password" id="pwd" placeholder="Password" onChange={handlePasswordState}/> 
                </div> 
                <button disabled={disabled} className="btn mt-3" type='submit' >Login</button>
            </form>
            <div className="text-center fs-6"> <a href="#">Forget password?</a></div>
        </div>
    </div>
  )
}

export default Auth;