import { useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import apiCalls from "../../EndPoints/AdminApiCalls";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    color: "#000", // sets text color of table cells to black
  },
});

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#fff",
      secondary: "#000", // sets primary text color to white
    },
  },
});

const VendorDetailsAndServices = () => {
  const classes = useStyles();
  const { vendorId } = useParams();
  const [services, setServices] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await apiCalls.VendorDetailsAndServices(vendorId);

      setVendor(response.vendorsDetailsServices);
      if (response.vendorsDetailsServices.services) {
        setServices(response.vendorsDetailsServices.services);
      }
    }
    fetchData();
  }, []);

  const handleClickAcceptVendor = async (id) => {
    const result = await apiCalls.acceptVendor(id);
    if (result.message) {
      setMessage(result.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: "flex", flexWrap:'wrap',justifyContent: 'center'}}
      >
        <Box bgcolor="#3A3131" display="inline-block" width="100%" maxWidth="750px" margin="20px">
          <div style={{ padding: "30px 20px" }}>
            {vendor && (
              <>
                <Typography variant="h4" gutterBottom color="textPrimary">
                  Parlour Name: {vendor.parlourDetails.parlourName}
                </Typography>
                <Typography variant="h5" color="textPrimary">
                  Parlour Address
                </Typography>
                <Box mb={2}>
                  <Typography variant="body1" color="textPrimary">
                    Owner Name: {vendor.parlourDetails.ownerName}{" "}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {" "}
                    Door No: {vendor.parlourDetails.doorNo}{" "}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {" "}
                    Street: {vendor.parlourDetails.street}{" "}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {" "}
                    City: {vendor.parlourDetails.city}{" "}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {" "}
                    State: {vendor.parlourDetails.state}{" "}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Phone Number: {vendor.phoneNumber}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Email: {vendor.email}
                  </Typography>
                </Box>
                <Typography variant="h5" color="textPrimary">
                  Parlour Images
                </Typography>
                <div style={{ display: "flex" }}>
                  {vendor.parlourDetails.images.map((image) => (
                    <img
                      key={image.public_id}
                      src={image.url}
                      alt="Parlour"
                      style={{
                        width: "200px",
                        height: "170px",
                        margin: "10px",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Box>

        <div style={{ width: "100%",maxWidth:'750px', padding: "0 20px", paddingTop: "50px" }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} style={{ maxWidth: "750px" }}>
              <Typography
                variant="h5"
                align="center"
                style={{ color: "white" }}
              >
                Services Providing
              </Typography>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  aria-label="vendor services table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        Sl.No.
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        Category
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        Service Name
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        Description
                      </TableCell>
                      <TableCell className={classes.tableCell}>Price</TableCell>
                      <TableCell className={classes.tableCell}>Image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {services.map((service, index) => (
                      <TableRow key={service._id}>
                        <TableCell className={classes.tableCell}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {service.categoryId.name}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {service.service}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {service.description}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {service.price}
                        </TableCell>
                        <TableCell>
                          <img
                            src={service.image[0].url}
                            alt={service.service}
                            style={{ maxWidth: "30px", maxHeight: "30px" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {vendor && vendor.isVendor ? (
              <Typography
                variant="body1"
                style={{
                  color: "green",
                  fontWeight: "bold",
                  paddingTop: "10px",
                }}
              >
                Vendor is already accepted
              </Typography>
            ) : (
              <Grid
                item
                xs={12}
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickAcceptVendor(vendor._id)}
                >
                  Accept the vendor
                </Button>
              </Grid>
            )}
            {message && (
              <Typography variant="body1" style={{ color: "green" }}>
                {message}
              </Typography>
            )}
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default VendorDetailsAndServices;
