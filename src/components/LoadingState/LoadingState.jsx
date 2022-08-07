import React from 'react';

import './LoadingState.scss';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingState = () => {
  return (
    <Box className="loading-container">
      <CircularProgress/>
    </Box>
  );
}

export default LoadingState;
