import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import Post from "../components/Post";
import PropTypes from 'prop-types';

class PostsContainer extends Component {
  render() {
    let posts = this.props.posts.map( (post) => {
      return <Post key={post.id} {...post} />;
    } );

    return (
      <div>
        <SearchBar/>
        {posts}
      </div>
    );
  }
}

PostsContainer.propTypes = {
  posts: PropTypes.object
};

export default PostsContainer;
