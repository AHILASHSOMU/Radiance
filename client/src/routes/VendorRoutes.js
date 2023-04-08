import React from 'react'
import { Routes,Route, } from 'react-router-dom'
import VendorSignup from '../pages/VendorPages/VendorSignup'
import VendorSignin from '../pages/VendorPages/VendorSignin'
import VendorHome from "../pages/VendorPages/VendorHome"
import VerificationDone from '../pages/VendorPages/VerificationDone'
import EmailOTP from '../pages/VendorPages/EmailOTP'
import ForgotPass from '../pages/VendorPages/ForgotPass'
import NewPass from "../pages/VendorPages/NewPass";


function VendorRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/vendor/vendorHome' element={<VendorHome/>}></Route>
       <Route path='/vendor/vendorSignup' element={<VendorSignup/>}></Route> 
       <Route path='/vendor/vendorSignin' element={<VendorSignin/>}></Route> 
       <Route path="/vendor/emailVerification/:id" element={<EmailOTP/>}/>
       <Route path="/vendor/verificationSuccess" element={<VerificationDone/>}/>
       <Route path="/vendor/forgotPassword" element={<ForgotPass/>} />
       <Route path="/vendor/enterPassword/:id/:token" element={<NewPass/>}/>  

      </Routes>
    </div>
  )
}

export default VendorRoutes
