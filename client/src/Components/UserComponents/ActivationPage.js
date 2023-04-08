import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { Box } from "@mui/system";
import apiCalls from "../../EndPoints/UserApiCalls";
import { useNavigate, useParams } from "react-router-dom";

export const ActivationPage = () => {
  const [showButton, setShowButton] = useState(false);
  const activationToken = useParams();
  const navigate = useNavigate();
  console.log(activationToken, "here is the activation params token");
  const activateMail = async () => {
    try {
      if (activationToken) {
        await apiCalls.activateMail(activationToken);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    activateMail();
  }, [activationToken]);

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
    onRest: () => setShowButton(true), // set showButton to true after animation completes
  });

  const slide = useSpring({
    from: { transform: "translateY(100px)" },
    to: { transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const button = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: {
      opacity: showButton ? 1 : 0,
      transform: showButton ? "translateY(0)" : "translateY(50px)",
    },
    config: { duration: 500, delay: 500 },
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <animated.div style={fade}>
          <animated.div style={slide}>
            <Typography
              sx={{ color: "white" }}
              variant="h5"
              align="center"
              gutterBottom
            >
              Email verification successful!
            </Typography>
            <Typography sx={{ color: "white" }} variant="body1" align="center">
              Your email address has been successfully verified. Thank you for
              registering.
            </Typography>
          </animated.div>
        </animated.div>
        <animated.div style={button}>
          {showButton && (
            <div sx={{ mt: 2 }}>
              <Button
                sx={{ marginTop: 4 }}
                variant="contained"
                color="primary"
                onClick={() => navigate("/signin")}
              >
                Login
              </Button>
            </div>
          )}
        </animated.div>
      </Box>
    </>
  );
};
