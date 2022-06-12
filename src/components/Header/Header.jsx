import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

import './Header.scss';

import Context from '../../context/Context';
import paths from '../../paths/paths';

import { useTranslation } from 'react-i18next';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const Header = (props) => {
    const context = useContext(Context);
    const { t } = useTranslation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h6">
                            {t('app-name')}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Link to={paths.login}>{t('sign-in').toUpperCase()}</Link>
                            </Grid>
                            <Grid item>
                                <Tooltip title={ context.email }>
                                    <IconButton >
                                        <Avatar />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
export default Header;