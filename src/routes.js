import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import Page from './containers/Page/Page';
import PostsContainer from './containers/PostsContainer/PostsContainer';
import SinglePostContainer from './containers/SinglePostContainer/SinglePostContainer';

export default () => { // eslint-disable-line
    return (
        <Router>
            <Page>
                <Route exact path="/" component={PostsContainer}/>
                <Route path="/posts/:id" component={SinglePostContainer} />
            </Page>
        </Router>

    );
};