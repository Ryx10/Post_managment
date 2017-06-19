import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './post.scss';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

class Post extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        deletePost: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state ={
            modalIsOpen: false
        };
    }
    __deletePost = (e) => {
        e.preventDefault();
        this.props.deletePost(this.props.id);
        this.__hideModal();
    }
    __hideModal = (evt) => {
        evt.preventDefault();
        this.setState({...this.state, modalIsOpen: false});
    }
    __showModal = (evt)  => {
        evt.preventDefault();
        this.setState({...this.state, modalIsOpen: true});
    }
    __renderModal() {
        return(
            <Modal isOpen={this.state.modalIsOpen} >
                <ModalHeader>
                    <ModalClose onClick={this.__hideModal}/>
                    <ModalTitle>Delete post</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p>Are your sure that you want to delete post?</p>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-default" onClick={this.__hideModal}>
                        Close
                    </button>
                    <button className="btn btn-danger" onClick={this.__deletePost}>
                        Delete
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
    render() {
        return (
            <div>
                <div className="post">
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
                                <button className="post__btn post__btn--alert btn" onClick={this.__showModal}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.__renderModal()}
            </div>
        );
    }
}
Post.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
};

export default Post;

