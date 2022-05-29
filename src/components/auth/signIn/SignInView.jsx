import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SignInForm from './SignInForm';

const LoadingPage = () => {
  return (
    <Container component="main">
      <Box>
        <SignInForm />
      </Box>
    </Container>
  );
}

export default LoadingPage;
