import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import SignIn from '../../Components/UserComponents/SignIn'
import Navbar from '../../layouts/Navbar'

function UserSignin() {

  const navigate = useNavigate();
  useEffect(()=>{
    const user = localStorage.getItem("usertoken");
    user&&navigate("/",{replace:true});
  })

  return (
    <div>
      {/* <Navbar/> */}
      <SignIn/>
    </div>
  )
}

export default UserSignin
