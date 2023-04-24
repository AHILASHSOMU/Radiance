import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxSx() {
  return (
    <Box
    sx={{
      width: "100vw",
      height: 300,
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 20
    }}
  >
    <ul style={{ display: 'flex', listStyleType: 'none', marginTop: '30', color: 'white', padding: 10, paddingLeft: '0px' }}>
      <li style={{ marginRight: '190px' }}>
        <h3>Company</h3>
        <ul style={{ listStyleType: 'none', padding: 0, gap: '10px' }}>
          <li >About us</li>
          <li >Careers</li>
          <li >Contact</li>
        </ul>
      </li>
      <li style={{ marginRight: '190px' }}>
        <h3>For Customers</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginRight: '10px' }}>Products</li>
          <li style={{ marginRight: '10px' }}>Services</li>
          <li style={{ marginRight: '10px' }}>FAQ</li>
        </ul>
      </li>
      <li style={{ marginRight: '190px' }}>
        <h3>For Partners</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginRight: '10px' }}>Partner program</li>
          <li style={{ marginRight: '10px' }}>Join us</li>
          <li style={{ marginRight: '10px' }}>Benefits</li>
        </ul>
      </li>
      <li>
        <h3>Social</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginRight: '10px' }}>Twitter</li>
          <li style={{ marginRight: '10px' }}>Facebook</li>
          <li style={{ marginRight: '10px' }}>LinkedIn</li>
        </ul>
      </li>
    </ul>
  </Box>
  



  );
}