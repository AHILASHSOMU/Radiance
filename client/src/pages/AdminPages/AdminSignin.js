import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import SignIn from "../../Components/AdminComponents/SignIn";
import { useSelector } from 'react-redux';


function AdminSignin() {
   
    const navigate = useNavigate();

    const adminLogin = useSelector((state)=>state.admin)
  const {adminData, token} = adminLogin
    useEffect(()=>{
      if(token){
        navigate("/admin/adminHome",{replace:true});
      }
    })

    return (
     <div>
      <SignIn/>
     </div>
    );
}

export default AdminSignin
