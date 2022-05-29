import React from 'react';
import './SignInForm.scss';
import { useTranslation } from 'react-i18next';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const SignInForm = () => {
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container maxWidth="xs">
      <Box className="sign-in-form-container">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('sign-in')}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="sign-in-form">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('email-address')}
            name="email"
            autoComplete="email"
            autoFocus/>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('password')}
            type="password"
            id="password"
            autoComplete="current-password"/>
          <Button
            className="sign-in-submit"
            type="submit"
            fullWidth
            variant="contained">
              {t('sign-in')}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {t('no-account-sign-up')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignInForm;
