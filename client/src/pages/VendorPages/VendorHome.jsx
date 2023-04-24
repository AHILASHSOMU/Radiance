import React from 'react'
import VendorNavbar from "../../layouts/VendorNavbar"
import VedorBanner from '../../Components/VendorComponents/VendorBanner'
import Footer from "../../Components/UserComponents/Footer"
import Services from "../../Components/VendorComponents/Services"

function VendorHome() {
  return (
    <div>
      <VendorNavbar/>
      <VedorBanner/>
      <Services/>
      <Footer/>
    </div>
  )
}

export default VendorHome
