import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from './../../images/logo.svg'

const Header = () => {
  return (<>
        <div className="topnav" id="myTopnav">
            <Link to="/">
                <img src={logo} className="logo" alt="CG logo" />
            </Link>
            <NavLink to="/about">About</NavLink>
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