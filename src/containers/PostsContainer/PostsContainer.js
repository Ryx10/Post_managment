import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Post from "../../components/Post/Post";
import PropTypes from 'prop-types';

class PostsContainer extends Component {
  render() {
    let posts = this.props.posts.map( (post) => {
      return <Post key={post.id} {...post} />;
    } );

    return (
      <div>
        <SearchBar searchPosts={this.props.searchPosts}/>
        {posts}
      </div>
    );
  }
}

PostsContainer.propTypes = {
  posts: PropTypes.array,
  searchPosts: PropTypes.func.isRequired
};

export default PostsContainer;
