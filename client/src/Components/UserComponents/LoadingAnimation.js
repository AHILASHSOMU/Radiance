import React from 'react';
import { CircularProgress } from '@material-ui/core';

const LoadingAnimation = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh' }}>
      <CircularProgress size={25} />
    </div>
  );
};

export default LoadingAnimation;