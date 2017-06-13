import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './comment.scss';

class Comment extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    }
    render() {
        return (
            <div className="comment">
                <h4 className="cmment__title">{this.props.name}</h4>
                <p>{this.props.body}</p>
            </div>
        );
    }
}

export default Comment;
    