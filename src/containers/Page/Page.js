import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Test from '../../components/Test';
import PostsContainer from '../PostsContainer/PostsContainer';
import 'whatwg-fetch';
import './page.scss';
import baseConfig from '../../config';

class Page extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            allPosts:  []
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
                this.setState({
                    allPosts: responseData,
                });
            } )
            .catch( (err) => console.error(err) );
    }

    render() {
        return (
            <div className="app-container container">
                <div className="row">
                    <Header title={baseConfig.header.title} logoSrc={baseConfig.header.logoSrc} />
                </div>
                <div className="row">
                    <PostsContainer posts={this.state.allPosts}/>
                </div>
                <div className="row">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Page;
