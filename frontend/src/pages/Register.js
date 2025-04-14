import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const navigate= useNavigate()

const handleSubmit= async (e) =>{
    e.preventDefault()
    try{
        const response = await axios.post('http://localhost:5000/api/auth/register', 
            {name,email,password}
        );
        if (response.data.success){
            navigate('/login')
        }
    }catch(error){
        console.log(error)
    }

}

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Register</h3>
      <div className='d-flex justify-content-center'>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputName1" className="form-label">Name</label>
                <input type="name" 
                className="form-control" 
                id="exampleInputName1" 
                aria-describedby="nameHelp" 
                style={{ width: '350px'}}
                onChange={(e)=>setName(e.target.value)}
                />
            </div>
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
        </form>
        </div>
    </div>
  )
}

export default Register
