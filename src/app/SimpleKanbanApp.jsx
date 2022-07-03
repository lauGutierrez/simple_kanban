import './SimpleKanbanApp.scss';
import { useSelector } from 'react-redux';
import React, { Suspense } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import paths from '../router/paths';
import LoadingState from '../components/LoadingState/LoadingState';
import SignIn from '../components/SignIn/SignIn';
import Home from '../components/Home/Home';
import BoardEditor from '../components/BoardEditor/BoardEditor';
import i18n from '../i18n/i18n';

const SimpleKanbanApp = () => {

  const user = useSelector(state => state.user);

  return (
    <Suspense fallback={<LoadingState />}>
      <Router>
        {Object.keys(user).length !== 0 ? 
          (
            <Routes>
              <Route exact path={paths.login} element={<SignIn redirectTo={paths.home} />}></Route>
              <Route exact path={paths.home} element={<Home />}></Route>
              <Route exact path={paths.board} element={<BoardEditor />}></Route>
            </Routes>
          ):
          (
            <Routes>
              <Route path={paths.all} element={<SignIn redirectTo={paths.home} />}></Route>
            </Routes>
          )
        }
      </Router>
    </Suspense>
  );
}

export default SimpleKanbanApp;
