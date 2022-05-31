import './SimpleKanbanApp.scss';
import React, { Suspense } from 'react';

import LoadingPage from '../components/global/loadingPage/LoadingPage';
import SignInView from '../components/signInView/SignInView';
import i18n from '../i18n/i18n';

const SimpleKanbanApp = () => {

  const onSignInSuccess = (data) => {
    console.log(data);
  };

  return (
    <Suspense fallback={<LoadingPage />}>
        <SignInView onSignInSuccess={onSignInSuccess}/>
    </Suspense>
  );
}

export default SimpleKanbanApp;
