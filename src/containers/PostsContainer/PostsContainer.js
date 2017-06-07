import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Post from '../../components/Post/Post';
import PropTypes from 'prop-types';
import './post-container.scss';

class PostsContainer extends Component {
    static propTypes = {
        posts: PropTypes.array,
    };
    constructor(props) {
        super(props);
        this.inputValue='';
        this.state = {
            searchValue: this.inputValue
        };
    }
    __updateValue = (evt) => {
        this.inputValue = evt.target.value;
    }
    __searchEvent = (evt) => {
        evt.preventDefault();
        console.log(this.inputValue);
        this.setState({searchValue: this.inputValue});
    }
    __renderPosts(value) {
        const filteredPosts = this.props.posts.filter((post) => post.title.indexOf(value) > -1);
        const displayedPosts = filteredPosts.map((post) => {
            return <Post key={post.id} {...post} />;
        });
        return displayedPosts;
    }
    render() {
        return (
            <div>
                <SearchBar searchEvent={this.__searchEvent} updateValue={this.__updateValue}/>
                {this.__renderPosts(this.state.searchValue)}
            </div>
        );
    }
}

export default PostsContainer;
