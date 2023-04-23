import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email,getEmail]=useState("")
    const [password,getPassword]=useState("")
    const navigate=useNavigate()


    const handleLogin=async()=>{
        if(email && password ){
            fetch("https://booklistapp-c8hj.onrender.com/signin",
            {
                method:"post",
                body:JSON.stringify({email,password})
                ,headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(resp=>resp.json())
            .then((data)=>{
                localStorage.setItem("token",data.auth)
                localStorage.setItem("user",( data.result.email))
                if(data.auth){
                    navigate("/home")
                }
             
            })
            .catch((err)=>{console.log(err)

            })

        }
    }

    
  return (
    <div className='box'>
        <div className="inputTag">
        <h1>Member Login</h1>
            <input type="email" placeholder='Username'
            value={email}
            onChange={(e)=>{getEmail(e.target.value)}}
            />
            <input type="password" placeholder='Enter password'
            value={password}
            onChange={(e)=>{getPassword(e.target.value)}}

            />
            <button onClick={()=>{handleLogin()}}>LOGIN</button>
            <p style={{color:"red"}}>Forgot password ?</p>
            <p>Create a new account ?</p> <Link to={"/signup"}> Register</Link>

        </div>

    </div>
  )
}

export default Login