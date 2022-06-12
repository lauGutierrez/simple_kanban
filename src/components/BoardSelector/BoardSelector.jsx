import React, { useState, useEffect } from 'react';
import './BoardSelector.scss';

import { useTranslation } from 'react-i18next';

const BoardSelector = (props) => {
    const { t } = useTranslation();
    
    return (
        <h1>AQUI ELIGES UNO DE TUS BOARDS</h1>
    );
}
export default BoardSelector;