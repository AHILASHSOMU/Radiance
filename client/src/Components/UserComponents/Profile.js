import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import apiCalls from "../../EndPoints/UserApiCalls";

export default function Profile() {
  const userLogin = useSelector((state) => state.user);
  const { userData } = userLogin;

  const id = userData._id;

  const [addressAdded,setAddressAdded] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const response = await apiCalls.userAddress(id);
      console.log(response);
      setAddress(response);
    }
    fetchData();
  }, [addressAdded]);

  const [DoorNo, setDoorNo] = useState(" ");
  const [Street, setStreet] = useState(" ");
  const [Landmark, setLandmark] = useState(" ");
  const [City, setCity] = useState(" ");
  const [State, setState] = useState(" ");
  const [Pincode, setPincode] = useState(" ");

  const [message, setMessage] = useState("");
  const [address, setAddress] = useState(null);
 

  const handleDoorNoChange = (e) => {
    setDoorNo(e.target.value);
  };
  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };
  const handleLandmarkChange = (e) => {
    setLandmark(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  const handlepincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const [showTextFields, setShowTextFields] = useState(false);

  const handleAddAddressClick = () => {
    setShowTextFields(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      DoorNo,
      Street,
      Landmark,
      City,
      State,
      Pincode,
    };

    const userId = userData._id;
    console.log("profilepage", formData, userId);
    try {
      const response = await apiCalls.userAddAddress(formData, userId);

      if (response.success) {
        setMessage(response.message);
        setAddressAdded(!addressAdded)
      }
    } catch (error) {
      console.log(error);
    }
    setShowTextFields(false);
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}} >
    <Box sx={{ marginTop:'50px'}}>
      <Card variant="outlined">
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div">
            Username: {userData.name}
          </Typography>
          <Typography variant="body1">
            Phone Number: {userData.phoneNumber}
          </Typography>
          <Typography variant="body1">Email: {userData.email}</Typography>
          {message && (
            <Typography
              variant="subtitle1"
              style={{ marginTop: "8px", color: "green" }}
            >
              {message}
            </Typography>
          )}
        </CardContent>
        {address && (
  <Box sx={{justifyContent: "center", display: "flex", marginTop:'10px'}}>
    <Box sx={{ backgroundColor: "white", width: 500, }}>
      <Typography variant="h6" sx={{ color: "black",textAlign: "center" }}>
        Address:
      </Typography>
      {address.DoorNo && address.City && address.State && address.Pincode && address.Landmark ? (
        <>
          <Typography sx={{ color: "black", display: "block",textAlign: "center" }}>
            {`DoorNo.- ${address.DoorNo}`}
          </Typography>
          <Typography sx={{ color: "black", display: "block",textAlign: "center" }}>
            {`Street- ${address.Street}`}
          </Typography>
          <Typography sx={{ color: "black", display: "block",textAlign: "center" }}>
            {`Landmark- ${address.Landmark}`}
          </Typography>
          <Typography sx={{ color: "black", display: "block",textAlign: "center" }}>
            {`City- ${address.City}`}
          </Typography>
          <Typography sx={{ color: "black", display: "block",textAlign: "center" }}>
            {`State- ${address.State}`}
          </Typography>
          <Typography sx={{ color: "black", display: "block",textAlign: "center" }}>
            {`Pincode- ${address.Pincode}`}
          </Typography>
        </>
      ) : (
        <Typography sx={{ color: "black", display: "block",textAlign: "center" }}>
          Address not added yet. Please add your address.
        </Typography>
      )}
    </Box>
  </Box>
)}

        <CardActions sx={{ justifyContent: "center", flexWrap: "wrap" }}>
          {showTextFields ? (
            <form
              onSubmit={handleSubmit}
              sx={{
                width: "50%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  value={DoorNo}
                  onChange={handleDoorNoChange}
                  id="input-with-sx"
                  label="Door No."
                  variant="standard"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  value={Street}
                  onChange={handleStreetChange}
                  id="input-with-sx"
                  label="Street"
                  variant="standard"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  value={Landmark}
                  onChange={handleLandmarkChange}
                  id="input-with-sx"
                  label="Landmark"
                  variant="standard"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  value={City}
                  onChange={handleCityChange}
                  id="input-with-sx"
                  label="City"
                  variant="standard"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  value={State}
                  onChange={handleStateChange}
                  id="input-with-sx"
                  label="State"
                  variant="standard"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  value={Pincode}
                  onChange={handlepincodeChange}
                  id="input-with-sx"
                  label="Pincode"
                  variant="standard"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </form>
          ) : (
            <Box
              sx={{
                width: "160px",
                display: "inline-flex",
                justifyContent: "center",
              }}
            >
              <Button size="small" onClick={handleAddAddressClick}>
                Add address
              </Button>
            </Box>
          )}
        </CardActions>
      </Card>
    </Box>
    </Box>
  );
}
