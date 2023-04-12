import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { clearUser } from '../../redux/actions/userActions'
import logo from './../../images/logo.svg'

const Header = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (<>
        <div className="topnav" id="myTopnav">
            <Link to="/">
                <img src={logo} className="logo" alt="CG logo" />
            </Link>
            {!user? 
              <NavLink to="/login">Login</NavLink>:
              <>
                <Link to="#" onClick={() => dispatch(clearUser())}>Logout</Link>
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