import { Typography, Grid, Card, CardContent } from "@material-ui/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import apiCalls from "../../EndPoints/UserApiCalls";
import { Button } from "@material-ui/core";
import { useState } from "react";

function SingleViewPage() {
  const { parlourId } = useParams();
  const [parlour, setParlour] = useState(null);
  const [services, setServices] = useState([]);

  const numImages =
    parlour && parlour.parlourDetails.images
      ? parlour.parlourDetails.images.length
      : 0;
  const numColumns = 3; // Change this to the desired number of columns
  const imageSize = 150;
  const paddingSize = 10;
  const totalWidth = numColumns * (imageSize + paddingSize);

  useEffect(() => {
    async function fetchData() {
      const response = await apiCalls.parlourSingleViewPage(parlourId);
      console.log(response);
      setParlour(response.parlourDetailsServices);

      if (response.parlourDetailsServices.services) {
        setServices(response.parlourDetailsServices.services);
      }
    }
    fetchData();
  }, [parlourId]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card
        style={{
          backgroundColor: "#3A3131",
          boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <CardContent>
          <Typography variant="h4" style={{ fontSize: "24px", color: "white" }}>
            {parlour && parlour.parlourDetails.parlourName}
          </Typography>
          <Typography variant="subtitle1" style={{ color: "white" }}>
            {parlour && parlour.parlourDetails.ownerName}
            <br />
            {parlour && parlour.parlourDetails.doorNo},{" "}
            {parlour && parlour.parlourDetails.street}
            <br />
            {parlour && parlour.parlourDetails.city},{" "}
            {parlour && parlour.parlourDetails.state}{" "}
            {parlour && parlour.parlourDetails.pincode}.
          </Typography>
          <div
            style={{
              border: "1px solid black",
              padding: "5px",
              width: totalWidth,
              color: "white"
            }}
          >
            <h4>Parlour Images:</h4>
            <Grid container>
              {parlour &&
                parlour.parlourDetails.images &&
                parlour.parlourDetails.images.map((image) => {
                  return (
                    <Grid
                      item
                      xs={12 / numColumns}
                      key={image.public_id}
                      style={{ padding: paddingSize / 2 }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img
                          src={image.url}
                          alt="Parlour"
                          style={{ width: imageSize, height: imageSize }}
                        />
                      </div>
                    </Grid>
                  );
                })}
            </Grid>
          </div>

          <div
            style={{
              border: "1px solid black",
              padding: "5px",
              margin: "20px 0",
            }}
          >
            <table
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      textAlign: "left",
                      color: "white"
                    }}
                  >
                    Sl No
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      textAlign: "left",
                      color: "white"
                    }}
                  >
                    Service Name
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      textAlign: "left",
                      color: "white"
                    }}
                  >
                    Category Name
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      textAlign: "left",
                      color: "white"
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      textAlign: "left",
                      color: "white"
                    }}
                  >
                    Image
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      textAlign: "left",
                      color: "white"
                    }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {services &&
                  services.map((service, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "5px",
                          textAlign: "left",
                          color: "white"
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "5px",
                          textAlign: "left",
                          color: "white"
                        }}
                      >
                        {service.service}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "5px",
                          textAlign: "left",
                          color: "white"
                        }}
                      >
                        {service.categoryId.name}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "5px",
                          textAlign: "left",
                          color: "white"
                        }}
                      >
                        {service.description}
                      </td>
                      {service.image && service.image.length > 0 && (
                        <td
                          style={{ border: "1px solid black", padding: "5px" }}
                        >
                          <img
                            src={service.image[0].url}
                            alt={service.service}
                            style={{ width: "100px" }}
                          />
                        </td>
                      )}
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "5px",
                          textAlign: "left",
                          color: "white"
                        }}
                      >
                        {service.price}Rs.
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SingleViewPage;
