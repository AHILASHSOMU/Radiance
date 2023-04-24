import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import SignIn from '../../Components/UserComponents/SignIn'
import Navbar from '../../layouts/Navbar'
import { useSelector } from 'react-redux'

function UserSignin() {



  return (
    <div>
      {/* <Navbar/> */}
      <SignIn/>
    </div>
  )
}

export default UserSignin
