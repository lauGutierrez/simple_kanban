import './SimpleKanbanApp.scss';

import { useSelector, useDispatch } from 'react-redux';
import React, { Suspense, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { firebase } from '../services/firebase/firebase';
import 'firebase/compat/auth';

import paths from '../router/paths';
import actions from '../services/redux/actions/actions';

import LoadingState from '../components/LoadingState/LoadingState';
import SignIn from '../components/SignIn/SignIn';
import Home from '../components/Home/Home';
import BoardEditor from '../components/BoardEditor/BoardEditor';

// eslint-disable-next-line
import i18n from '../i18n/i18n';

const SimpleKanbanApp = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ready, setReady] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: "Tahoma, sans-serif"
    },
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(
          user.multiFactor.user.uid,
          user.multiFactor.user.email,
          user.multiFactor.user.displayName
        );
      }
      setReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrentUser = (id, email, name) => {
    dispatch(actions.userActions.signIn({
      id: id,
      email: email,
      name: name
    }));
  }

  return (
    <Suspense fallback={<LoadingState />}>
      {ready ?
        (
          <ThemeProvider theme={theme}>
            <Router>
              {Object.keys(user).length !== 0 ?
                (
                  <Routes>
                    <Route exact path={paths.login} element={<SignIn redirectTo={paths.home} />}></Route>
                    <Route exact path={paths.home} element={<Home />}></Route>
                    <Route exact path={paths.board} element={<BoardEditor />}></Route>
                  </Routes>
                ) :
                (
                  <Routes>
                    <Route path={paths.all} element={<SignIn redirectTo={paths.home} />}></Route>
                  </Routes>
                )
              }
            </Router>
          </ThemeProvider>
        ):
        (
          <LoadingState />
        )
      }
      
    </Suspense>
  );
}

export default SimpleKanbanApp;
