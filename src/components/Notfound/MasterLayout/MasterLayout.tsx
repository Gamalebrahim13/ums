import React from 'react'
import Sidbar from '../../Login/Sidebar/Sidbar'
import Navbar from '../../Login/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
   
    <div className="d-flex">
        <div>
            <Sidbar/>
        </div>
        <div className="w-100">
            <Navbar/>
            <Outlet/>
        </div>
   
   </div>
  )
}
