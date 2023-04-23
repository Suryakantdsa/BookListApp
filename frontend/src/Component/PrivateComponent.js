import React from 'react'
import {Outlet,Navigate} from "react-router-dom"

function PrivateComponent() {
    const auth=localStorage.getItem("token")
  return (
    <div>
        {auth?<Outlet/>:<Navigate to={"/signin"}/>}
    </div>
  )
}

export default PrivateComponent