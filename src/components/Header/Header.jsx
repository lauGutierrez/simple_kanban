import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { firebase } from '../../services/firebase/firebase';
import 'firebase/compat/auth';
import paths from '../../router/paths';
import actions from '../../services/redux/actions/actions';

import './Header.scss';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const signOut = async () => {
        await firebase.auth().signOut();
        dispatch(actions.userActions.signOut());
        navigate(paths.login);
    }

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
                                <Tooltip title={ user.email }>
                                    <IconButton >
                                        <Avatar />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title={t('sign-out')}>
                                    <IconButton onClick={signOut}>
                                        <LogoutIcon >
                                        </LogoutIcon>
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