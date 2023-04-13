import { Card } from 'primereact/card'
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { register } from '../../services/user.service';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isValidEmail, isValidTextField, isValidUsername } from '../../utils/helpers';

const RegisterComponent = () => {
  // navigate and dispatch hooks for state and navigation
  const navigate = useNavigate();

  //   Fetching user state to get current status of user
  const user = useSelector(state => state.user);

  //   Component states for form handling
  const [formData, setFormData] = useState({
    username: {
        value: '', error: '', valid: false
    },
    password: {
        value: '', error: '', valid: false
    },
    email: {
        value: '', error: '', valid: false
    },
    name: {
        value: '', error: '', valid: false
    }
  });

  const [progress, setProgress] = useState(false)

  //   Ref for toast notification
  const toast = useRef(null);

  //   Handler for username
  const handleChange = (value, name) => {
    if(!isValidTextField(value)){
        let error = (name[0]+"").toUpperCase() + name.substr(1) + " is required!";
        setFormData({...formData, [name]: {value: value, error, valid: false}})
    }else if(name === "username" && !isValidUsername(value)){
        setFormData({...formData, [name]: {value: value, error: "Username should not contains any speacial characters or spaces!", valid: false}})
    }else if(name === "email" && !isValidEmail(value)){
        setFormData({...formData, [name]: {value: value, error: "Please enter valid email!", valid: false}})
    }else{
      setFormData({...formData, [name]: {value: value, error:"", valid: true}})
    }
  }

  //   Handler for register submit
  const handleSubmit = async () => {
    setProgress(true);
    if(!formData.username.valid || !formData.password.valid || !formData.name.valid || !formData.email.valid){
      toast.current.show({
        severity: 'warn',
        summary: 'All fields are required!',
        life: 3000,
      })
      setProgress(false);
    }else{
      // Register service call
      const registerRes = await register(formData.name.value, formData.email.value,
                                    formData.username.value, formData.password.value);
      if(registerRes && registerRes.statusCode === 200){
        toast.current.show({
          severity: 'success',
          summary: 'User Registered successfully!',
          life: 3000,
        })

        setFormData({
          username: {
              value: '', error: '', valid: false
          },
          password: {
              value: '', error: '', valid: false
          },
          email: {
              value: '', error: '', valid: false
          },
          name: {
              value: '', error: '', valid: false
          }
        })

        setTimeout(() => navigate('/login'), 2000);
      }else{
        toast.current.show({
          severity: 'error',
          summary: "Unable to register, please try again in sometime.",
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
          title="Register"
          style={{width: '100%'}}>
          <div className="flex flex-column gap-2">
              <label htmlFor="name">Name</label>
              <InputText
                type={"text"}
                name="name"
                id="name"
                aria-describedby="name-help"
                value={formData.name.value}
                onChange={e => handleChange(e.target.value, e.target.name)} />
              <small id="name-help" className="input-error">{formData.name.error}</small>
          </div>
          <div className="flex flex-column gap-2">
              <label htmlFor="email">Email</label>
              <InputText
                type={"email"}
                id="email"
                name="email"
                value={formData.email.value} 
                onChange={(e) => handleChange(e.target.value, e.target.name)}
                aria-describedby="blog-email" />
              <small id="blog-email" className="input-error">{formData.email.error}</small>
          </div>
          <div className="flex flex-column gap-2">
              <label htmlFor="username">Username</label>
              <InputText
                type={"text"}
                name="username"
                id="username"
                aria-describedby="username-help"
                value={formData.username.value}
                onChange={e => handleChange(e.target.value, e.target.name)} />
              <small id="username-help" className="input-error">{formData.username.error}</small>
          </div>
          <div className="flex flex-column gap-2">
              <label htmlFor="password">Password</label>
              <InputText
                type={"password"}
                id="password"
                name="password"
                value={formData.password.value} 
                onChange={(e) => handleChange(e.target.value, e.target.name)}
                aria-describedby="blog-password" />
              <small id="blog-password" className="input-error">{formData.password.error}</small>
          </div>
          <Button 
            label="Submit"
            icon={progress? 'pi pi-spin pi-spinner': 'pi pi-send'}
            onClick={handleSubmit}
            disabled={progress} />

          <div className="mt-3">
              Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </Card>
      </div>
      <div className="col-12 lg:col-4 md:col-3"></div>
    </div>
  )
}

export default RegisterComponent