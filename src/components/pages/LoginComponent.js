import { Card } from 'primereact/card'
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { login } from '../../services/user.service';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import { isValidTextField } from '../../utils/helpers';
import setAuthToken from '../../utils/setAuthToken';

// Login page component
const LoginComponent = () => {
  // navigate and dispatch hooks for state and navigation
  const dispatch = useDispatch();

//   Fetching user state to get current status of user
  const user = useSelector(state => state.user);

//   Component states for form handling
  const [username, setUsername] = useState({
    value: '', error: '', valid: false
  });

  const [password, setPassword] = useState({
    value: '', error: '', valid: false
  });

  const [progress, setProgress] = useState(false)

//   Ref for toast notification
  const toast = useRef(null);

//   Handler for username
  const handleUsername = value => {
    if(!isValidTextField(value)){
      setUsername({value: value, error: "Username is required!", valid: false})
    }else{
      setUsername({value: value, error: "", valid: true})
    }
  }

//   Handler for password
  const handlePassword = value => {
    if(!isValidTextField(value)){
      setPassword({value: value, error: "Content is required!", valid: false})
    }else{
      setPassword({value: value, error: "", valid: true})
    }
  }

//   Handler for login submit
  const handleSubmit = async () => {
    setProgress(true);
    if(!username.valid || !password.valid){
      toast.current.show({
        severity: 'warn',
        summary: 'All fields are required!',
        life: 3000,
      })
      setProgress(false);
    }else{
      // Login service call
      const loginRes = await login(username.value, password.value);
      if(loginRes && loginRes.statusCode === 200){
        toast.current.show({
          severity: 'success',
          summary: 'Login successfully!',
          life: 3000,
        })

        // Setting up token in local storage
        localStorage.setItem('token', loginRes.data.token)
        setAuthToken(loginRes.data.token)
        setUsername({value: '', error: "", valid: false})
        setPassword({value: '', error: "", valid: false})

        // Dispatching user loading action for app state
        dispatch(loadUser());
        setTimeout(() => window.location.replace('/blogs'), 2000);
      }else{
        toast.current.show({
          severity: 'error',
          summary: loginRes.data,
          life: 3000,
        })
      }
      setProgress(false);
    }
  }

  return (
    user? 
    <Navigate to={'/blogs'} /> :
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12 lg:col-4 md:col-3"></div>
      <div className="col-12 lg:col-4 md:col-6 flex justify-content-center mt-4">
        <Card 
          title="Login"
          style={{width: '100%'}}>
          <div className="flex flex-column gap-2">
              <label htmlFor="username">Username</label>
              <InputText 
                type={"text"}
                id="username"
                aria-describedby="username-help"
                value={username.value}
                onChange={e => handleUsername(e.target.value)} />
              <small id="username-help" className="input-error">{username.error}</small>
          </div>
          <div className="flex flex-column gap-2">
              <label htmlFor="password">Password</label>
              <InputText
                type={"password"}
                id="password"
                value={password.value} 
                onChange={(e) => handlePassword(e.target.value)}
                aria-describedby="blog-password" />
              <small id="blog-password" className="input-error">{password.error}</small>
          </div>
          <Button 
            label="Submit"
            icon={progress? 'pi pi-spin pi-spinner': 'pi pi-send'}
            onClick={handleSubmit}
            disabled={progress} />
          <div className="mt-3">
              Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </Card>
      </div>
      <div className="col-12 lg:col-4 md:col-3"></div>
    </div>
  )
}

export default LoginComponent