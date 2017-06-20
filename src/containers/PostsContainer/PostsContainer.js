import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Post from '../../components/Post/Post';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import './post-container.scss';
import { connect } from 'react-redux';

class PostsContainer extends Component {
    static propTypes = {
        posts: PropTypes.array,
        deletePost: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
    }
    __getPostsTitles() {
        return values(this.props.posts.map(post => {return {label: post.title};}));
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
                <SearchBar searchEvent={this.props.searchEvent} postsTitles={this.__getPostsTitles()} inputValue={this.props.inputValue} updateInputValue={this.props.updateInputValue}/>
                {this.__renderPosts(this.props.searchValue)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchValue: state.searchValue,
        inputValue: state.inputValue
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        searchEvent: () => dispatch({type: 'SEARCH_FOR_POSTS'}),
        updateInputValue: (value) => dispatch({type: 'UPDATE_INPUT_VALUE', value: value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
