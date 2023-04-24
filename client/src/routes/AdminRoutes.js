import React from 'react'
import { Route,Routes } from "react-router-dom";
import AdminHome from "../pages/AdminPages/AdminHome"
import AdminSignin from '../pages/AdminPages/AdminSignin';
import VendorDetailsAndServices from '../Components/AdminComponents/VendorsDetailsAndServices';
import NewVendorDetails from '../pages/AdminPages/NewVendorDetails';

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/admin/adminHome" element={<AdminHome/>}/>
        <Route path="/admin/adminSignin" element={<AdminSignin/>}/>
        <Route path="/admin/vendorServices/:vendorId" element={<VendorDetailsAndServices/>}/>
      </Routes>
    </div>
  )
}


export default AdminRoutes
