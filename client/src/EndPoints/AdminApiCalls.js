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

const addCategory = async (inputValue)=>{
 
  try {

    console.log(inputValue,"AdminapiCalls");
    const response = await axios.post("/admin/addCategory", {inputValue})
    return response.data

  } catch (error) {

    console.log(error.message);
  }
}

const allCategory = async() => {
  try {
    const response = await axios.get("/admin/findCategory");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

const CategoryStatusControl = async(categoryId)=>{
  try {
    const response = await axios.patch('/admin/categoryStatusControl',categoryId);
    return response.data;
  } catch (error) {
    console.log(error.message)
  }
}

const VendorsRequest = async (req, res)=>{
  try {
    const response = await axios.get("/admin/vendorsRequest");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

const VendorDetailsAndServices = async (vendorId)=> {
  try {
    const response = await axios.get(`/admin/vendorDetailsAndServices/${vendorId}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

const acceptVendor = async(vendorId)=> {
  
  try {
    const response = await axios.patch(`/admin/acceptVendor/${vendorId}`);
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
    vendorStatusControl,
    addCategory,
    allCategory,
    CategoryStatusControl,
    VendorsRequest,
    VendorDetailsAndServices,
    acceptVendor

}

export default AdminApiCalls;