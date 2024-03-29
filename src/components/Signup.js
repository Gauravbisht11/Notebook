import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
function Signup(props) {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
  let navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value })
  }
  const handleClick = async (e) => {
    try {
      e.preventDefault()
      const response = await fetch("https://mern-notebook-e8dj.onrender.com/api/auth/createuser", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json()
      console.log(json)
      if (json.success === true) {
        //save the authtoken and redirect
        localStorage.setItem('token', json.authtoken)
        navigate('/')
        props.showAlert('Signed up successfully', 'success')
      }
      else {
        alert(json.error)
        props.showAlert('Invalid credentials', 'danger')
      }
    }
    catch (error) {
      console.error(error.response.data)
    }
  }
  return (
    <div className='container'>
      <h2> Create a account to use Notebook</h2>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={handleChange} minLength={3} required id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={handleChange} required aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={handleChange} minLength={5} required id="password" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
