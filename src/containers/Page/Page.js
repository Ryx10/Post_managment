import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PostsContainer from '../PostsContainer/PostsContainer';
import SinglePostContainer from '../SinglePostContainer/SinglePostContainer';
import AlertContainer from 'react-alert';
import 'whatwg-fetch';
import './page.scss';
import {baseConfig} from '../../config';
import postContainerStore from '../../store/postContainerStore';

class Page extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            allPosts:  [],

        };
    }
    componentDidMount() {
        this.getAllPosts();
    }

    getAllPosts() {
        const url = `${baseConfig.api.baseUrl}posts`;
        fetch(url, {headers: baseConfig.api.url})
            .then( (response) => response.json() )
            .then( (responseData) => {
                this.setState({...this.state, allPosts: responseData});
            } )
            .catch( (err) => console.error(err) );
    }
    __deletePost = (postId) => {
        const url = `${baseConfig.api.baseUrl}posts/${postId}`;
        const headers = baseConfig.api.headers;
        fetch(url, {
            method: "DELETE",
            headers: headers
        })
            .then(() => this.__showAlert(`Post deleted id:${postId}`, 'success'))
            .then(() => this.getAllPosts())
            .catch(() => this.__showAlert('Something went wrong', 'error'));

    }
    __showAlert = (message, type) => {
        this.msg.show(message, {
            time: 5000,
            type: type,
            theme: 'light'
        });
    }
    render() {
        return (
            <Router>
                <div className="app-container container">
                    <div className="row">
                        <Header title={baseConfig.header.title} logoSrc={baseConfig.header.logoSrc} />
                    </div>
                    <div className="row">
                        <Route exact path="/" component={() => <PostsContainer store={postContainerStore} posts={this.state.allPosts} deletePost={this.__deletePost} />}/>
                        <Route path="/posts/:id" component={(props) => <SinglePostContainer {...props} title="Insert post" showAlert={this.__showAlert} />} />
                    </div>
                    <div className="row">
                        <Footer/>
                    </div>
                    <AlertContainer ref={a => this.msg = a} />
                </div>
            </Router>
        );
    }
}

export default Page;
