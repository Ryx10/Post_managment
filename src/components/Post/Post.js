import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './post.scss';
import classNames from 'classnames';


class Post extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        showModal: PropTypes.func.isRequired,
        loggedUserId: PropTypes.number,
        userId: PropTypes.number
    };
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={classNames('post', {'active': this.props.loggedUserId === this.props.userId})}>
                    <div className="row">
                        <div className="col-md-10">
                            <h3 className="post__title">{this.props.title}</h3>
                            <p className="post__content">{this.props.body}</p>
                        </div>
                        <div className="btn-box col-md-2">
                            <div className="row col-xs-12 pull-right">
                                <Link to={`/posts/${this.props.id}`}>
                                    <button className="post__btn btn">Open</button>
                                </Link>
                            </div>
                            <div className="row col-xs-12 pull-right">
                                <button className="post__btn post__btn--alert btn" onClick={() => this.props.showModal(this.props.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;

