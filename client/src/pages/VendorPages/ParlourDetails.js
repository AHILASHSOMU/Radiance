import React, { useEffect } from 'react'
import VendorParlourDetails from '../../Components/VendorComponents/ParlourDetails'
import VendorNavbar from '../../layouts/VendorNavbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function AddServices() {

  const navigate = useNavigate();
  const vendorLogin = useSelector((state)=>state.vendor)
  const {vendorData, token} = vendorLogin

  // useEffect(()=>{
  //   if(!vendorData){
  //      navigate("/vendor/vendorsignin")
  //   }
  // })

  return (
    <div>
        <VendorNavbar/>
        <VendorParlourDetails/>
    </div>
  )
}

export default AddServices
