import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import PropTypes from 'prop-types';
import Post from '../../components/Post/Post';
import values from 'lodash/values';
import AlertContainer from 'react-alert';
import './post-container.scss';
import {connect} from "react-redux";
import {searchPost, updateInput, fetchPostsIfNeeded, deletePost, showModal, hideModal} from '../../actions/actionsCreators';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

class PostsContainer extends Component {
    static propTypes = {
        fetchPosts: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        deletingId: PropTypes.string,
        allPosts: PropTypes.array,
        showModal: PropTypes.func.isRequired,
        modalIsOpen: PropTypes.bool.isRequired,
        hideModal: PropTypes.func.isRequired,
        searchEvent: PropTypes.func.isRequired,
        inputValue: PropTypes.string,
        updateInput: PropTypes.func,
        searchValue: PropTypes.string,
        updateInputValue: PropTypes.func.isRequired,
        loggedUserId: PropTypes.string
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchPosts();
    }
    __deletePost = (evt) => {
        evt.preventDefault();
        this.props.deletePost(this.props.deletingId, this.__showAlert);
    };
    __getPostsTitles() {
        return values(this.props.allPosts.map(post => {return {label: post.title};}));
    }
    __showAlert = (message, type) => {
        this.msg.show(message, {
            time: 5000,
            type: type,
            theme: 'light'
        });
    };
    __renderPosts(value) {
        const filteredPosts = this.props.allPosts.filter((post) => post.title.indexOf(value) > -1);
        const displayedPosts = filteredPosts.map((post) => {
            return <Post loggedUserId={parseInt(this.props.loggedUserId)} key={post.id} {...post} showModal={this.props.showModal} />;
        });
        return displayedPosts;
    }
    __renderModal() {
        return(
            <Modal isOpen={this.props.modalIsOpen} >
                <ModalHeader>
                    <ModalClose onClick={this.props.hideModal}/>
                    <ModalTitle>Delete post</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p>Are your sure that you want to delete post?</p>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-default" onClick={this.props.hideModal}>
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
                <SearchBar searchEvent={this.props.searchEvent} postsTitles={this.__getPostsTitles()} inputValue={this.props.inputValue} updateInputValue={this.props.updateInputValue}/>
                {this.__renderPosts(this.props.searchValue)}
                <AlertContainer ref={a => this.msg = a} />
                {this.__renderModal()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchValue: state.post.searchValue,
    inputValue: state.post.inputValue,
    allPosts: state.post.allPosts,
    isFetching: state.post.isFetching,
    modalIsOpen: state.post.modalIsOpen,
    deletingId: state.post.deletingId,
    loggedUserId: state.login.loggedUserId

});
const mapDispatchToProps = dispatch => ({
    searchEvent: () => dispatch(searchPost()),
    updateInputValue: (value) => dispatch(updateInput(value)),
    fetchPosts: () => dispatch(fetchPostsIfNeeded()),
    deletePost: (postId, showAlert) => dispatch(deletePost(postId, showAlert)),
    showModal: (deletingId) => dispatch(showModal(deletingId)),
    hideModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
