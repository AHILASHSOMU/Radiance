import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name: Yup.string().min(3).required("Please enter your Name"),
    email: Yup.string().email().required("Please enter your Email"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Phone Is Required"),
    password: Yup.string()
      .min(6)
      .required("Please enter password"),
    confirmPassword: Yup.string()
     .required()
      .oneOf([Yup.ref("password"),null], "password not matched"),
       
     
})

export const signInSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string()
      .min(6)
      .required("Please enter password"),
});