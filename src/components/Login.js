import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
function Login(props) {
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate=useNavigate();
    const handleClick=async(e)=>{
        e.preventDefault()
       const response=await fetch("/api/auth/login",{
            method: "POST",
            
            headers: {
              "Content-Type": "application/json"              
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json()

          // console.log(json)
          if(json.success===true){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert('Successfully loged in','success')
            navigate('/')
          }
          else{
            props.showAlert('Invalid credentials','danger')
          }
    }
const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <div className='container'>
      <h2> Login to Notebook</h2>
      <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={credentials.email} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} value={credentials.password} id="password" />
          </div>
          
          <button type="submit"  className="btn btn-primary " >Login</button>
        </form>
    </div>
  )
}

export default Login
