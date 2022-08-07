import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './SignIn.scss';

import { useTranslation } from 'react-i18next';
import { firebase } from '../../services/firebase/firebase';
import 'firebase/compat/auth';
import operations from '../../services/firebase/firestore/operations';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';

import actions from '../../services/redux/actions/actions';

const SignIn = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const uiConfig = {
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: async (data) => {
                await operations.userOperations.createUserIfNoExists(
                    data.user.multiFactor.user.uid,
                    data.user.multiFactor.user.email,
                    data.user.multiFactor.user.displayName
                );
                setCurrentUser(
                    data.user.multiFactor.user.uid,
                    data.user.multiFactor.user.email,
                    data.user.multiFactor.user.displayName
                );
            }
        },
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    };

    const setCurrentUser = (id, email, name) => {
        dispatch(actions.userActions.signIn({
            id: id,
            email: email,
            name: name
        }));
        navigate(props.redirectTo);
    }
    
    return (
        <div className="sign-in-container">
            <Grid
                container
                spacing={1}
                align="center"
                justify="center"
                direction="row">
                <Grid item xs={12}>
                    <Typography variant="h1" component="h1" className="app-name">
                        {t('app-name')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </Grid>
            </Grid>
        </div>
    );
}

export default SignIn;