import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import bgimage from '../assets/bg.jpg'

const Login = () => {
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const navigate= useNavigate()

const handleSubmit= async (e) =>{
    e.preventDefault()
    try{
        const response = await axios.post('http://localhost:5000/api/auth/login', 
            {email,password}
        );
        if (response.data.success){
            localStorage.setItem("token", response.data.token)
            navigate('/home')
        }
    }catch(error){
        console.log(error)
    }

}

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Login</h3>
      <div className='d-flex justify-content-center'>
      <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" 
                className="form-control" id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                style={{ width: '350px'}}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <div id="emailHelp" 
                className="form-text">We'll never share your email with anyone else.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" 
                className="form-control" 
                id="exampleInputPassword1" 
                style={{ width: '350px'}} 
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <div className="mb-3">
            <label htmlFor="exampleInput" className="form-label">Don't have an account? Kindly register</label>
            </div>
            <div className="mb-3">
            <Link to='/register' class="btn btn-primary">Register</Link>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
