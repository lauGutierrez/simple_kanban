import React from 'react';
import './Home.scss';
import InternalView from '../InternalView/InternalView';
import BoardSelector from '../BoardSelector/BoardSelector';

const Home = (props) => {
    return (
        <InternalView>
            <BoardSelector></BoardSelector>
        </InternalView>
    );
}
export default Home;