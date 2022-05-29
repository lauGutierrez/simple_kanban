import './SimpleKanbanApp.scss';
import i18n from '../i18n/i18n';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import LoadingPage from '../components/global/loadingPage/LoadingPage';
import SignInView from '../components/auth/signIn/SignInView';

const SimpleKanbanApp = () => {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<LoadingPage />}>
      <Container component="main">
        <Box>
          <SignInView/>
        </Box>
      </Container>
    </Suspense>
  );
}

export default SimpleKanbanApp;
