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

const sendResetLink = async (values) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post('/user/resetLink', values, config);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

const getUserValid = async (token, id) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.get(`/user/forgotPassword/${id}/${token}`, config);
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
      const response = await axios.post(`/user/changePassword/${id}/${token}`, values, config);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };



  const UserApiCalls = {
    signUp,
    signin,
    verifyOTP,
    resendOTP,
    setNewPassword,
    sendResetLink,
    getUserValid
  }

  export default UserApiCalls;