import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/ntl.png'

const NavBar = () => {
    const navigate= useNavigate()
    
    const onLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
      };
  return (
    <div>
      <nav class="navbar bg-body-tertiary w-100" style={{ width: '100%' }}>
        <div class="d-flex justify-content-between align-items-center w-100 px-3">
        <a class="navbar-brand" href="https://www.netlabindia.com/">
            <img src={logo} alt="Logo" width="90" height="55" class="d-inline-block align-text-top me-2"/>
            Network Techlab
        </a>
        <button class="btn btn-outline-primary" onClick={onLogout}>Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
