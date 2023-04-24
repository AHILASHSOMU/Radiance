import * as React from 'react';
import Card from '@mui/material/Card';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image1 from "../../public/images/image1.jpg"
import image2 from "../../public/images/image2.jpg"
import image3 from "../../public/images/image4.jpg"
import { Link } from 'react-router-dom';
import styles from "../../styles/VendorStyles/OurServices.css"


const useStyles = makeStyles({
  card: {
    margin: '0 40px',
    minWidth: 300,
    maxWidth: 400,
    flex: 1,
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'rotate(5deg)',
      animationName: 'shake',
      animationDuration: '0.5s',
      /* set animation properties */
    },
  },
});

export default function ActionAreaCard() {

  const classes = useStyles();

  return (
    <div>
      <Divider />
      <Typography variant="h4" align="center" gutterBottom color="white">
        Our Services
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', overflow: 'hidden' }}>
        <Card className={classes.card} sx={{ margin: "0 40px", minWidth: 300, maxWidth: 400, flex: 1 }}>
          <Link to="/vendor/parlourdetails" className="link">
          <CardActionArea>
            <CardMedia
              component="img"
              height={240}
              src={image1}
              alt="image 1"
              style={{ objectFit: 'cover' }}
            />
            <CardContent style={{ backgroundColor: "#110F0F", textAlign: "center" }}>
              <Typography gutterBottom variant="h5" component="div" style={{ color: "white" }} >
                Add parlour details
              </Typography>
            </CardContent>
          </CardActionArea>
          </Link>
        </Card>

        <Card className={classes.card} sx={{ margin: "0 40px", minWidth: 300, maxWidth: 400, flex: 1 }}>
        <Link to="/vendor/addServices" className="link">
          <CardActionArea>
            <CardMedia
              component="img"
              height={240}
              src={image2}
              alt="image 2"
              style={{ objectFit: 'cover' }}
            />
            <CardContent style={{ backgroundColor: "#110F0F", textAlign: "center" }}>
              <Typography gutterBottom variant="h5" component="div" style={{ color: "white" }}>
                Add your services you provide
              </Typography>
            </CardContent>
          </CardActionArea>
          </Link>
        </Card>

        <Card className={classes.card} sx={{ margin: "0 40px", minWidth: 300, maxWidth: 400, flex: 1 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height={240}
              src={image3}
              alt="image 3"
              style={{ objectFit: 'cover' }}
            />
            <CardContent style={{ backgroundColor: "#110F0F", textAlign: "center" }}>
              <Typography gutterBottom variant="h5" component="div" style={{ color: "white" }}>
                Top rated Parlours
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );

  
}