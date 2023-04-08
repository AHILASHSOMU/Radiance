import axios from "../utility/axios"



const adminsignin = async (adminData) =>{
    try {
      console.log(adminData);
      const response = await axios.post("/admin/adminsignin", adminData);
      return response.data;
  } catch (error) {
      console.log(error.message);
  }
  }

const userDetails = async()=>{
  console.log("came");
  try {
    const response = await axios.get("/admin/userDetails");
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}

const userStatusControl = async (userId)=>{
  try {
    const response = await axios.patch("/admin/userStatusControl",userId)
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}

const vendorDetails = async()=>{
  console.log("came");
  try {
    const response = await axios.get("/admin/vendorDetails");
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}

const vendorStatusControl = async (vendorId)=>{
  try {
    const response = await axios.patch("/admin/vendorStatusControl",vendorId)
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}

const AdminApiCalls = {
    adminsignin,
    userDetails,
    userStatusControl,
    vendorDetails,
    vendorStatusControl

}

export default AdminApiCalls;