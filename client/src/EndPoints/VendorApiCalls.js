import axios from "../utility/axios"





const vendorsignin = async (vendorData) => {
    try {
      console.log(vendorData);
      const response = await axios.post("/vendor/signin",vendorData);
      return response.data
    } catch (error) {
      console.log(error.message);
    }
  }

  const vendorsignUp = async (value) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    try {
      const response = await axios.post("/vendor/signup", value, config);
      return response.data;
    } catch (error) {
      console.log(error.message);
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
      const response = await axios.post(`/vendor/verifyOTP/${id}`,values, config);
      return response.data
    } catch (error) {
      console.log(error);
    }
  }
  
  const sendResetLink = async (values) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post('/vendor/resetLink', values, config);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getVendorValid = async (token, id) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.get(`/vendor/forgotPassword/${id}/${token}`, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const setNewPassword = async (token, id, values) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(`/vendor/changePassword/${id}/${token}`, values, config);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const VendorApiCalls = {
    vendorsignin,
    vendorsignUp,
    verifyOTP,
    sendResetLink,
    getVendorValid,
    setNewPassword

  }

  export default VendorApiCalls;