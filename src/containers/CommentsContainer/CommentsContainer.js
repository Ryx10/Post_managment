import React, {Component} from 'react';
import Comment from '../../components/Comment/Comment';
import 'whatwg-fetch';
import baseConfig from '../../config';
import './comments-container.scss';
import PropTypes from 'prop-types';

class CommentsContainer extends Component {
    static propTypes = {
        postId: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
    }

    componentDidMount(){
        const url = `${baseConfig.api.baseUrl}comments?postId=${this.props.postId}`;
        const headers = baseConfig.api.headers;
        fetch(url, headers)
            .then((response) => response.json())
            .then((comments) => {
                this.setState(Object.assign(this.state, {comments: comments}));
            });
    }
    __renderComments() {
        return this.state.comments.map((comment) => <Comment key={comment.id} {...comment} />);
    }
    render() {
        return (
            <div className="comment-box">
                <h3 className="comment-box__title">Comments</h3>
                {this.__renderComments()}
            </div>
        );
    }
}

export default CommentsContainer;
    