import React from 'react';
import './InternalView.scss';
import Header from '../Header/Header';

const InternalView = (props) => {
    return (
        <React.Fragment>
            <Header></Header>
            { props.children }
        </React.Fragment>
    );
}
export default InternalView;