import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
  render() {
    return (
      <div className="post">
        <div className="row">
          <div className="col-md-10">
            <h3>{this.props.title}</h3>
            <p>{this.props.body}</p>
          </div>
          <div className="btn-box col-md-2">
            <div className="row col-xs-12 pull-right">
              <button className="post__btn btn btn-primary">Open</button>
            </div>
            <div className="row col-xs-12 pull-right">
              <button className="post__btn btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default Post;

