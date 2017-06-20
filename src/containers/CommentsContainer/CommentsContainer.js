import React, {Component} from 'react';
import Comment from '../../components/Comment/Comment';
import 'whatwg-fetch';
import {baseConfig} from '../../config';
import './comments-container.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class CommentsContainer extends Component {
    static propTypes = {
        postId: PropTypes.number
    }

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.fetchComment();
    }
    __renderComments() {
        return this.props.comments.map((comment) => <Comment key={comment.id} {...comment} />);
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

const mapStateToProps = (state) => {
    return {comments: state.comments};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(ownProps)
    return{
        fetchComment: () => {
            const url = `${baseConfig.api.baseUrl}comments?postId=${ownProps.postId}`;
            const headers = baseConfig.api.headers;
            fetch(url, headers)
                .then((response) => response.json())
                .then((comments) => {
                    dispatch({type: 'FETCH_COMMENTS', comments: comments});
                });
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);