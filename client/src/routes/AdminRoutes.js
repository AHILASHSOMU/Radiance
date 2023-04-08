import React from 'react'
import { Route,Routes } from "react-router-dom";
import AdminHome from "../pages/AdminPages/AdminHome"
import AdminSignin from '../pages/AdminPages/AdminSignin';

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/admin/adminHome" element={<AdminHome/>}/>
        <Route path="/admin/adminSignin" element={<AdminSignin/>}/>
        
      </Routes>
    </div>
  )
}

export default AdminRoutes
