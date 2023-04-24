import React from 'react'
import { Routes,Route, Outlet, Navigate, } from 'react-router-dom'
import VendorSignup from '../pages/VendorPages/VendorSignup'
import VendorSignin from '../pages/VendorPages/VendorSignin'
import VendorHome from "../pages/VendorPages/VendorHome"
import VerificationDone from '../pages/VendorPages/VerificationDone'
import EmailOTP from '../pages/VendorPages/EmailOTP'
import ForgotPass from '../pages/VendorPages/ForgotPass'
import NewPass from "../pages/VendorPages/NewPass";
import ParlourDetails from '../pages/VendorPages/ParlourDetails'
import AddServices from '../pages/VendorPages/AddServices'
import { useSelector } from 'react-redux'


function VendorProtected() {
  const vendorToken = useSelector((state) => state.vendor.token);
  return vendorToken ? <Outlet/> : <Navigate to ="/vendor/vendorSignin"/>;
}

function VendorValid() {
  const vendorToken = useSelector((state) => state.vendor.token);
  return vendorToken ? <VendorHome /> : <VendorSignin/>;
}

function VendorSignupValid() {
  const vendorToken = useSelector((state) => state.vendor.token);
  return vendorToken ? <VendorHome /> : <VendorSignup />;
}

function VendorRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/vendor/vendorHome' element={<VendorValid/>}></Route>
       <Route path='/vendor/vendorSignup' element={<VendorSignupValid/>}></Route> 
       <Route path='/vendor/vendorSignin' element={<VendorValid/>}></Route> 

       <Route path="/vendor/emailVerification/:id" element={<EmailOTP/>}/>
       <Route path="/vendor/verificationSuccess" element={<VerificationDone/>}/>
       <Route path="/vendor/forgotPassword" element={<ForgotPass/>} />
       <Route path="/vendor/enterPassword/:id/:token" element={<NewPass/>}/> 

       <Route element={<VendorProtected/>}>
       <Route path="/vendor/parlourdetails" element={<ParlourDetails/>}/>
       <Route path="/vendor/addServices" element={<AddServices/>}/>
       </Route>

      </Routes>
    </div>
  )
}

export default VendorRoutes
