import { SEARCH_POST, UPDATE_INPUT, RECEIVE_POSTS, REQUEST_POSTS, SHOW_MODAL, HIDE_MODAL, RECEIVE_POST_DATA, REQUEST_POST_DATA, POST_UPDATE } from './actionTypes';
import {baseConfig} from '../config';

export function searchPost() {
    return {
        type: SEARCH_POST
    };
}

export function updateInput(inputValue) {
    return {
        type: UPDATE_INPUT,
        inputValue
    };
}
/*
*   fetching posts actions
*/

function receivePosts(allPosts) {
    return {
        type: RECEIVE_POSTS,
        allPosts
    };
}
function requestPosts() {
    return {
        type: REQUEST_POSTS
    };
}
function fetchPosts() {
    return dispatch => {
        dispatch(requestPosts());
        return fetch(`${baseConfig.api.baseUrl}posts`)
            .then(response => response.json())
            .then(posts => dispatch(receivePosts(posts)))
            .catch(err => console.error(err));
    };
}
function shouldFetchPosts(state) {
    const posts = state.post.allPosts;
    if(!posts.length) {
        return true;
    }
    else {
        return false;
    }
}
export function fetchPostsIfNeeded() {
    return (dispatch, getState) => {
        if(shouldFetchPosts(getState())) {
            return dispatch(fetchPosts());
        }
    };
}
/*
* modal functions
*/

export function showModal(deletingId) {
    return {
        type: SHOW_MODAL,
        deletingId
    };
}

export function hideModal() {
    return {
        type: HIDE_MODAL
    };
}
/*
* delete posts action
*/

export function deletePost(postId, showAlert) {
    return dispatch => {
        fetch(`${baseConfig.api.baseUrl}posts/${postId}`, {
            method: 'DELETE',
            header: baseConfig.api.header
        })
            .then(() => dispatch(fetchPosts()))
            .then(() => dispatch(hideModal()))
            .then(() => showAlert(`Post deleted id:${postId}`, 'success'))
            .catch(() => showAlert('Something went wrong', 'error'));
        };
}
/*
* fetching single post data
*/

export function receivePostData(data) {
    return {
        type: RECEIVE_POST_DATA,
        showPreloader: false,
        ...data,
    };
}

export function requestPostData() {
    return {
        type: REQUEST_POST_DATA,
    };
}

export function fetchPostData(isNew, postId) {
    if(!isNew) {
        return dispatch => {
            dispatch(requestPostData());
            fetch(`${baseConfig.api.baseUrl}posts/${postId}`)
                .then(post => post.json())
                .then(postData => {
                    fetch(`${baseConfig.api.baseUrl}users`)
                        .then(users => users.json())
                        .then(usersData => {
                            fetch(`${baseConfig.api.baseUrl}comments?postId=${postId}`)
                                .then(comments => comments.json())
                                .then(commentsData => {
                                    const data = {
                                        title: postData.title,
                                        body: postData.body,
                                        userId: parseInt(postData.userId),
                                        postId: postData.id,
                                        users: usersData,
                                        comments: commentsData
                                    };
                                    dispatch(receivePostData(data));
                                });
                        });
                })
                .catch(err => console.error(err));
        };
    }
    else {
        return dispatch => {
            dispatch(requestPostData());
            fetch(`${baseConfig.api.baseUrl}users`)
                .then(users => users.json())
                .then(usersData => {
                    dispatch(receivePostData({users: usersData}));
                })
                .catch( err => console.error(err));
        };
    }
}
/*
* Updating post form fields
*/

export function postUpdate(evt) {
    let updatedValue = {};
    updatedValue[evt.target.name] = evt.target.value;
    return {
        type: POST_UPDATE,
        ...updatedValue
    };
}