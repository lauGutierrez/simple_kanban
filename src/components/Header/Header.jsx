import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

import './Header.scss';

import Context from '../../context/Context';

import { useTranslation } from 'react-i18next';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

const Header = (props) => {
    const context = useContext(Context);
    const { t } = useTranslation();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography variant="h6">
                        {t('app-name')}
                    </Typography>
                    <Link to="/login">{t('sign-in')}</Link>
                    <Box>
                        <Tooltip title={ context.email }>
                            <IconButton >
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;