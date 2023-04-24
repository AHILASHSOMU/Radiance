import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { Button } from "@mui/material";
import apiCalls from "../../EndPoints/UserApiCalls";
import { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function ParlourList() {
  const [parlours, setparlours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await apiCalls.parloursList();
      console.log(response);
      setparlours(response);
    }
    fetchData();
  }, []);


    const handleSingleViewPage = (parlourId) =>{
      navigate(`/singleViewPage/${parlourId}`);
    }

  return (
    <>
      <Grid container spacing={2}>
        {parlours.map((parlour) => (
         <Grid item key={parlour._id} xs={12} sm={6}>
         <Card sx={{ maxWidth: 500, marginTop: '30px', marginLeft: '30px', backgroundColor:"#3A3131" }}>
           <CardActionArea>
             <CardMedia
               component="img"
               height={200}
               src={parlour.parlourDetails.images[0].url} 
               alt="Parlour img"
             />
             <CardContent >
               <Typography gutterBottom variant="h5" component="div" style={{ color: 'white' }}>
                 {parlour.parlourDetails.parlourName} 
               </Typography>
               <Typography variant="body2" color="text.secondary" style={{ color: 'white' }}>
                 Street: {parlour.parlourDetails.street}, State: {parlour.parlourDetails.state}  
               </Typography>
               <Button variant="contained" color="primary" sx={{ marginTop: '10px' }} onClick={() => handleSingleViewPage(parlour._id)}>
                 View Store
               </Button>
             </CardContent>
           </CardActionArea>
         </Card>
       </Grid>
        ))}
      </Grid>
    </>
  );
}
