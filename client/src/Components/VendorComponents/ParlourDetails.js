import React, { useState } from "react";
import {
  Container,
  TextField,
  Paper,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import apiCalls from "../../EndPoints/VendorApiCalls";
import { useSelector } from "react-redux";

const ParlourDetails = () => {
  const [parlourName, setParlourName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [doorNo, setDoorNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleUpload(event) {
    const files = Array.from(event.target.files);
    console.log(files);
    files.forEach((file) => {
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
      };
    });
  }

  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const handleParlourNameChange = (event) => {
    setParlourName(event.target.value);
  };

  const handleOwnerNameChange = (event) => {
    setOwnerName(event.target.value);
  };

  const handleDoorNoChange = (event) => {
    setDoorNo(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const vendorLogin = useSelector((state) => state.vendor);
  const { vendorData } = vendorLogin;

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    setLoading(true);
    const formData = {
      parlourName,
      ownerName,
      doorNo,
      street,
      city,
      state,
      pincode,
    };
    const vendorId = vendorData._id;
    try {
      const response = await apiCalls.vendorparlourdetails(
        formData,
        vendorId,
        images
      );
      if (response.message) {
        setResponseMessage(response.message);
        setLoading(false);
        setImages([]);
      } if(response.error) {
        setErrorMessage(response.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Paper
        style={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#3A3131",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          style={{ marginBottom: "16px", color: "white" }}
        >
          Parlour Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Parlour Name"
                value={parlourName}
                onChange={handleParlourNameChange}
                style={{ marginBottom: "16px", width: "100%" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                label="Owner Name"
                value={ownerName}
                onChange={handleOwnerNameChange}
                style={{ marginBottom: "16px", width: "100%" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                label="Door No"
                value={doorNo}
                onChange={handleDoorNoChange}
                style={{ marginBottom: "16px", width: "100%" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                label="Street"
                value={street}
                onChange={handleStreetChange}
                style={{ marginBottom: "16px", width: "100%" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                label="City"
                value={city}
                onChange={handleCityChange}
                style={{ marginBottom: "16px", width: "100%" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                label="State"
                value={state}
                onChange={handleStateChange}
                style={{ marginBottom: "16px", width: "100%" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                label="Pincode"
                value={pincode}
                onChange={handlePincodeChange}
                style={{ marginBottom: "16px", width: "100%" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              {responseMessage && (
                <Typography variant="body1" style={{ color: "green" }}>
                  {responseMessage}
                </Typography>
              )}
                {errorMessage && (
                <Typography variant="body1" style={{ color: "red" }}>
                  {errorMessage}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "8px", color: "white" }}
              >
                Upload Your Parlour Images
              </Typography>
              <input
                type="file"
                id="formupload"
                name="image"
                accept="image/*"
                multiple
                onChange={handleUpload}
                style={{ marginBottom: "16px", width: "100%" }}
              />

              <div>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Parlour Image ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      marginBottom: "20px",
                    }}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            {loading ? "Uploading..." : "Submit your details"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ParlourDetails;
