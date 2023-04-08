import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from "../../layouts/adminSidebar"

function AdminHome() {

  const navigate = useNavigate();
  useEffect(()=>{
    const admin = localStorage.getItem("admintoken");
    !admin&&navigate("/admin/adminSignin",{replace:true});
  })

  return (
    <div>
      <AdminSidebar/>
    </div>
  )
}

export default AdminHome
