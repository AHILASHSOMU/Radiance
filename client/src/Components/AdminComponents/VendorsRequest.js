import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import apiCalls from "../../EndPoints/AdminApiCalls"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VendorsRequest() {


    const navigate = useNavigate();
    const [vendorsDetails, setVendorsDetails] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const response = await apiCalls.VendorsRequest();
            setVendorsDetails(response.vendorsDetails);
        }
       
       fetchData();

    },[])

    const handleViewStoreClick = (vendorId) => {
        navigate(`/admin/vendorServices/${vendorId}`);
    }
    
    return (
        <div>
          <Grid container spacing={3}>
            {vendorsDetails.map((vendor) => (
              <Grid item xs={12} sm={6} md={4} key={vendor._id}>
                <Card sx={{ maxWidth: '100%', backgroundColor: "#363333", color: "white" }} >
                  <CardMedia component="img" alt="Vendor Image" height="140" src={vendor.parlourDetails.images[0].url} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {vendor.parlourDetails.parlourName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ color: "white" }}>
                      Street: {vendor.parlourDetails.street}, City: {vendor.parlourDetails.city}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="small" sx={{ backgroundColor: "#315C98" }} onClick={() => handleViewStoreClick(vendor._id)}>View Store</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      );
      
}