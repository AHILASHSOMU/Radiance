import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { useEffect } from "react";
import apiCalls from "../../EndPoints/VendorApiCalls";
import { useSelector } from "react-redux";

function VendorAddServices() {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function fetchData() {
      const response = await apiCalls.categoryList();
      setCategoryList(response.categories);
    }
    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleServiceChange = (event) =>{
    setService(event.target.value);
  }

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const vendorLogin = useSelector((state) => state.vendor);
  const { vendorData } = vendorLogin;

  const handleAddService = async (event) => {
    event.preventDefault();
    const formData = {
      categoryName,
      service,
      price,
      description,
      image: image,
    };
    const vendorId = vendorData._id;
    try {
      const response = await apiCalls.addservices(formData, vendorId);
      console.log(response);
      if (response.message) {
        console.log(response.message);

        setImage([]);
        setMessage(response.message);

        setCategoryName("");
        setPrice("");
        setDescription("");
        setService("")
        setImage(null);

      } else {
        setErrorMessage(response.error);
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
          Services Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              style={{ marginBottom: "16px", width: "100%" }}
            >
              <InputLabel id="service-label" style={{ color: "white" }}>
                Select Service
              </InputLabel>
              <Select
                labelId="service-label"
                id="service-select"
                value={categoryName}
                onChange={handleCategoryChange}
                label="Select Category"
                inputProps={{ style: { color: "white" } }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}
              >
                {categoryList.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.name}
                    style={{ color: "black" }}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Service"
              value={service}
              onChange={handleServiceChange}
              style={{ marginBottom: "16px", width: "100%" }}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />
            <TextField
              label="Price"
              value={price}
              onChange={handlePriceChange}
              style={{ marginBottom: "16px", width: "100%" }}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />
            <TextField
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              style={{ marginBottom: "16px", width: "100%" }}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />

            <Typography
              variant="subtitle1"
              style={{ marginBottom: "8px", color: "white" }}
            >
              Upload a Image
            </Typography>
            <input
              type="file"
              id="formupload"
              name="image"
              accept="image/*"
              onChange={handleImage}
              style={{ marginBottom: "16px", width: "100%" }}
            />
            {message && (
              <Typography
                variant="subtitle1"
                style={{ marginTop: "8px", color: "green" }}
              >
                {message}
              </Typography>
            )}
             {errorMessage && (
              <Typography
                variant="subtitle1"
                style={{ marginTop: "8px", color: "red" }}
              >
                {errorMessage}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddService}
            >
              Add Service
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default VendorAddServices;
