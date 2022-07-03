import React, { useState, useEffect } from 'react';
import './Home.scss';
import InternalView from '../InternalView/InternalView';
import BoardSelector from '../BoardSelector/BoardSelector';
import { useTranslation } from 'react-i18next';

const Home = (props) => {
    const { t } = useTranslation();
    
    return (
        <InternalView>
            <BoardSelector></BoardSelector>
        </InternalView>
    );
}
export default Home;