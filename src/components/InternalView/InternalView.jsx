import React, { useState, useEffect } from 'react';
import './InternalView.scss';
import Header from '../Header/Header';

import { useTranslation } from 'react-i18next';

const InternalView = (props) => {
    const { t } = useTranslation();
    
    return (
        <React.Fragment>
            <Header></Header>
            { props.children }
        </React.Fragment>
    );
}
export default InternalView;