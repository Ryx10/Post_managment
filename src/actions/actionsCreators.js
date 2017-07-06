import { SEARCH_POST, UPDATE_INPUT, RECEIVE_POSTS, REQUEST_POSTS, SHOW_MODAL, HIDE_MODAL, RECEIVE_POST_DATA, REQUEST_POST_DATA, POST_UPDATE, REQUEST_LOGIN, RESPONSE_LOGIN, GET_USER_DATA_REQUEST, GET_USER_DATA_RESPONSE, LOGOUT_USER, TITLE_VALIDATION, BODY_VALIDATION, USER_VALIDATION, LOGIN_VALIDATION, PASSWORD_VALIDATION } from './actionTypes';
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
    let headers = new Headers();
    headers.append("Authorization", localStorage.getItem('token'));
    if(!isNew) {
        return dispatch => {
            dispatch(requestPostData());
            fetch(`${baseConfig.api.baseUrl}posts/${postId}`)
                .then(post => post.json())
                .then(postData => {
                    fetch(`${baseConfig.api.baseUrl}authors`, {
                        headers: headers
                    })
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

/*
* Login actions
*/

function loginRequest() {
    return {
        type: REQUEST_LOGIN,
    };
}

function loginResponse(data) {
    return {
        type: RESPONSE_LOGIN,
        ...data
    };
}

export function loginAction(login, password, showAlert) {
    return dispatch => {
        dispatch(loginRequest());
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        fetch(`${baseConfig.api.baseUrl}auth/login`,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify({"login":login, "password": password}),
        })
            .then(response => {
                if(response.status === 401) {
                    showAlert('Login and/or password are incorrect', 'error');
                    return {token: ""};
                }
                return response.json();
            })
            .then(data => dispatch(loginResponse(data)))
            .catch(err => console.error(err));
    };
}
/*
* fetching logged user name
*/

function getLoggedUserDataRequest() {
    return {
        type: GET_USER_DATA_REQUEST
    };
    
}

function getLoggedUserDataResponse(data) {
    return {
        type: GET_USER_DATA_RESPONSE,
        ...data
    };

}

export function getLoggedUserData(token) {
    return dispatch => {
        dispatch(getLoggedUserDataRequest());
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', token);
        headers.append('Access-Control-Allow-Origin', '*');

        fetch(`${baseConfig.api.baseUrl}auth/me`, {
            method: "GET",
            headers: headers
        })
            .then(response => response.json())
            .then(userData => {
                const loggedUser = `${userData.firstName} ${userData.lastName}`;
                const loggedUserId = userData.id;
                dispatch(getLoggedUserDataResponse({loggedUser, loggedUserId}));
                localStorage.setItem('user', loggedUser);
                localStorage.setItem('userId', loggedUserId);
            })
            .catch(err => console.error(err));
    };

}
/*
* logout action
*/

export function userLogout() {
    return {
        type: LOGOUT_USER
    };
}

/**
 * validation
 */

export function checkTitle(value) {
    return {
        type: TITLE_VALIDATION,
        value
    };
}

export function checkBody(value) {
    return {
        type: BODY_VALIDATION,
        value
    };
}

export function checkUser(value) {
    return {
        type: USER_VALIDATION,
        value
    };
}

export function checkLogin(value) {
    return {
        type: LOGIN_VALIDATION,
        value
    };
}

export function checkPassword(value) {
    return {
        type: PASSWORD_VALIDATION,
        value
    };
}