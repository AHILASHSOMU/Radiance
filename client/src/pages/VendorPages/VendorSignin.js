import React, {useState,useEffect} from "react";
import SignIn from "../../Components/VendorComponents/SignIn";
import Navbar from "../../layouts/Navbar";
import {useNavigate} from "react-router-dom"



function VendorSignin() {

  const navigate = useNavigate();
  useEffect(()=>{
    const vendor = localStorage.getItem("vendortoken");
    vendor&&navigate("/vendor/vendorHome",{replace:true});
  })

  return (
    <div>
   {/* <Navbar/> */}
   <SignIn/>
   </div>
  );
}

export default VendorSignin;
