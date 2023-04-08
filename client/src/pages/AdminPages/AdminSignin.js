import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import SignIn from "../../Components/AdminComponents/SignIn";


function AdminSignin() {
   
    const navigate = useNavigate();
    useEffect(()=>{
      const admin = localStorage.getItem("admintoken");
      admin&&navigate("/admin/adminHome",{replace:true});
    })

    return (
     <div>
      <SignIn/>
     </div>
    );
}

export default AdminSignin
