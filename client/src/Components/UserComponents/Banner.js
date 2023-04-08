import * as React from 'react';
import Box from '@mui/material/Box';
import backgroundImage from "../../public/images/bannerimg.jpg"

export default function BoxSx() {

    return (
        <Box
          sx={{
            width: '100vw',
            height: 500, // set height to 100% of the viewport height
            backgroundImage: `url(${backgroundImage})`, // set background image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
            // responsive styles
            '@media (max-width: 600px)': { // adjust styles for small screens
              height: 300,
            },
            '@media (min-width: 601px) and (max-width: 1200px)': { // adjust styles for medium screens
              height: 400,
            },
          }}
        />
      );
}