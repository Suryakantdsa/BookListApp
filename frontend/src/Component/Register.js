import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const [email,getEmail]=useState("")
    const [password,getPassword]=useState("")
    const [passwordRepeat,getPasswordRep]=useState("")

    const navigate=useNavigate()

    const handleRegister=async()=>{
        console.log(password,passwordRepeat)
        if(password===passwordRepeat){
            fetch("https://booklistapp-c8hj.onrender.com/signup",
            {
                method:"post",
                body:JSON.stringify({email,password})
                ,headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(resp=>resp.json())
            .then((data)=>{
                console.log(data.auth)
                localStorage.setItem("token",data.auth)
                localStorage.setItem("user",( data.result.email))
                if(data.auth){
                    navigate("/signin")
                }
                console.log(data.result)
            })
            .catch(err=>console.log(err))

        }
        else{
            alert("all the field is mandatory")
        }

    }
  return (
    <div className='box' style={{backgroundColor:"aqua"}}>
        <div className="inputTag">
        <h1>Register</h1>
            <input type="email" placeholder='Username'
            value={email}
            onChange={(e)=>{getEmail(e.target.value)}}
            
            />
            <input type="password" placeholder='Enter password'
                value={password}
                onChange={(e)=>{getPassword(e.target.value)}}
            />
            <input type="password" placeholder='Confirm password'
            value={passwordRepeat}
            onChange={(e)=>{getPasswordRep(e.target.value)}}
            />
            <button onClick={handleRegister}>REGISTER</button>
            <p style={{color:"red"}}><Link to={"/signin"}>Member Login</Link></p>

        </div>

    </div>
  )
}

export default Register