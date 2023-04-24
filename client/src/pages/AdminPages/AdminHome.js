import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from "../../layouts/adminSidebar"
import { useSelector } from 'react-redux';

function AdminHome() {

  const navigate = useNavigate();

  const adminLogin = useSelector((state)=>state.admin)
  const {adminData, token} = adminLogin
  useEffect(()=>{
    if(token){
      navigate("/admin/adminHome",{replace:true});
    }else{
      navigate("/admin/adminSignin")
    }
  });

  return (
    <div>
      <AdminSidebar/>
    </div>
  )
}

export default AdminHome
