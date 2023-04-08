import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import { useFormik } from "formik";
import { signInSchema } from "../../schemas";
import apiCalls from "../../EndPoints/UserApiCalls";
import { useNavigate } from "react-router";

function SignIn() {
  const marginTop = { marginTop: 5 };

  const pageStyle = {
    backgroundColor: "#312E2E",
    height: "100vh",
  };
  const paperStyle = { padding: "30px 20px", width: 310, margin: "7px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const [error, setError] = useState("");
  const navigate = useNavigate("");

  const initialValues = {
    email: "",

    password: "",
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,

      onSubmit: async (values, action) => {
        console.log(values);

        const response = await apiCalls.signin(values);
        console.log(response);
        if (response.user) {
          localStorage.setItem("usertoken", response.user);
          navigate("/");
        } else {
          setError(response.error);
        }
        action.resetForm();
      },
    });

  console.log(errors);

  return (
    <Grid>
      <Paper
        elevation={20}
        style={{
          ...paperStyle,
          marginTop: "130px",
          backgroundColor: "#3A3131",
        }}
      >
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign In</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to Enter into your account !
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <Typography color="error" variant="body2">
              {errors.email}
            </Typography>
          ) : null}

          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ marginTop: "10px" }}
          />
          {errors.password && touched.password ? (
            <Typography color="error" variant="body2">
              {errors.password}
            </Typography>
          ) : null}

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: "10px" }}
          >
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>

            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "10px" }}
            >
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  New User? Please
                  <Link href="/signup" variant="body2">
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                Forgot Password?
                <Link href="/forgotPassword" variant="body2">
                  Reset Here
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export default SignIn;
