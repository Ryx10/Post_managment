import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Post from '../../components/Post/Post';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './post-container.scss';
import 'whatwg-fetch';


class PostsContainer extends Component {
    static propTypes = {
        posts: PropTypes.array,
        deletePost: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };
    }
    __searchEvent = (value) => {
        this.setState(Object.assign(this.state, {searchValue: value}));
    }
    __getPostsTitles() {
        return _.values(this.props.posts.map(post => {return {label: post.title};}));
    }
    __renderPosts(value) {
        const filteredPosts = this.props.posts.filter((post) => post.title.indexOf(value) > -1);
        const displayedPosts = filteredPosts.map((post) => {
            return <Post key={post.id} {...post} deletePost={this.props.deletePost} />;
        });
        return displayedPosts;
    }
    render() {
        return (
            <div>
                <SearchBar searchEvent={this.__searchEvent} postsTitles={this.__getPostsTitles()} searchValue={this.state.inputValue} />
                {this.__renderPosts(this.state.searchValue)}
            </div>
        );
    }
}

export default PostsContainer;
