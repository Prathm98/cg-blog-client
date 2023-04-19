import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { clearUser } from '../../redux/features/userSlice'
import logo from './../../images/logo.svg'

const Header = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(clearUser())
    localStorage.clear()
  }

  return (<>
        <div className="topnav" id="myTopnav">
            <Link to="/">
                <img src={logo} className="logo" alt="CG logo" />
            </Link>
            {!user? 
              <NavLink to="/login">Login</NavLink>:
              <>
                <Link to="#" onClick={() => logoutUser()}>Logout</Link>
                <NavLink to={`/user/${user.username}`}>Profile</NavLink>
              </>
            }
            <NavLink to="/blogs">Blogs</NavLink>
            <Link to="#" className="icon" onClick={() => myFunction()}>
                <i className="pi pi-bars"></i>
            </Link>
        </div>
        <div className='header'></div>
    </>
  )
}

const myFunction = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

export default Header