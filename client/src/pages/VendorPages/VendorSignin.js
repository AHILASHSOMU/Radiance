import React, {useState,useEffect} from "react";
import SignIn from "../../Components/VendorComponents/SignIn";
import Navbar from "../../layouts/VendorNavbar";
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";



function VendorSignin() {

  const navigate = useNavigate();
  const vendorLogin = useSelector((state)=>state.vendor)
  const {vendorData, token} = vendorLogin

  useEffect(()=>{
    if(vendorData){
      navigate("/vendor/vendorHome",{replace:true});
    }
  })
  return (
    <div>
   <Navbar/>
   <SignIn/>
   </div>
  );
}

export default VendorSignin;
