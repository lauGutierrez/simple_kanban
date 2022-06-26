import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './BoardSelector.scss';

import { useTranslation } from 'react-i18next';

const BoardSelector = (props) => {
    const { t } = useTranslation();
    
    return (
        <React.Fragment>
            <pre>
                {
                    JSON.stringify(props, null, 2)
                }
            </pre>
            <button onClick={() => props.addBoard()}>
                ADD BOARD
            </button>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
    addBoard: () => dispatch({
        type: 'ADD_BOARD',
        payload: {
            id: 1,
            name: 'Este es un board'
        }
    })
});

const connectedBoardSelector = connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardSelector);

export default connectedBoardSelector;