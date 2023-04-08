import React from 'react'

import Navbar from '../../layouts/Navbar'
import Banner from '../../Components/UserComponents/Banner'
import OurServices from "../../Components/UserComponents/Services"


function UserHome() {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <OurServices/>
      
    </div>
  )
}

export default UserHome
