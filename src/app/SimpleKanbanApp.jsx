import './SimpleKanbanApp.scss';
import React, { Suspense, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import paths from '../paths/paths';
import LoadingState from '../components/LoadingState/LoadingState';
import SignIn from '../components/SignIn/SignIn';
import Home from '../components/Home/Home';
import Context from '../context/Context';
import i18n from '../i18n/i18n';

const SimpleKanbanApp = () => {

  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState('');

  const onSignInSuccess = (uid, email) => {
    setUid(uid);
    setEmail(email);
  }

  return (
    <Suspense fallback={<LoadingState />}>
      <Context.Provider value={{'uid': uid, 'email': email}}>
        <Router>
          <Routes>
            <Route path={paths.login} element={<SignIn onSignInSuccess={onSignInSuccess} redirectTo={paths.home} />}></Route>
            <Route path={paths.home} element={<Home />}></Route>
          </Routes>
        </Router>
      </Context.Provider>
    </Suspense>
  );
}

export default SimpleKanbanApp;
