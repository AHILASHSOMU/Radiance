import axios from "../utility/axios"


const signUp = async (value) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post('/user/signup', value, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  };

  const verifyOTP = async (values, id) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(`/user/verifyOTP/${id}`,values, config);
      return response.data
    } catch (error) {
      console.log(error);
    }
  }

  const resendOTP = async (values) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post("/user/resendOTP", values, config);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }

  // const activateMail = async (activationToken) => {
  //   try {
  //     const response = await axios.post("/user/activation", activationToken);
  //     return response;
  //   } catch (error) {
  //     console.log(error.message);
  //     return error.response.data;
  //   }
  // };

  const signin = async (userData) =>{
    try {
      console.log(userData);
      const response = await axios.post("/user/signin", userData);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  const vendorsignin = async (vendorData) => {
    try {
      console.log(vendorData);
      const response = await axios.post("/vendor/signin",vendorData);
      return response.data
    } catch (error) {
      console.log(error.message);
    }
  }

  const vendorsignUp = async (vendorData) => {
    try {
      console.log(vendorData);
      const response = await axios.post("/vendor/signup", vendorData);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

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

const apiCalls = {
    signUp,
    signin,
    vendorsignUp,
    vendorsignin,
    adminsignin,
    userDetails,
    userStatusControl,
    vendorDetails,
    vendorStatusControl,
    verifyOTP,
    resendOTP
  };

  export default apiCalls;