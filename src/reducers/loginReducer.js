import {REQUEST_LOGIN, RESPONSE_LOGIN, GET_USER_DATA_REQUEST, GET_USER_DATA_RESPONSE, UPDATE_LOGIN_EMAIL, LOGOUT_USER} from '../actions/actionTypes';

const initialState = {
    isLogged: !!localStorage.getItem('token'),
    loginEmail: '',
    isFetching: false,
    token: localStorage.getItem('token') || '',
    loggedUser: localStorage.getItem('user') || '',
    loggedUserId: localStorage.getItem('userId') || null
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {...state, isFetching: true};
        case RESPONSE_LOGIN:
            localStorage.setItem('token', action.token);
            return {
                ...state,
                isFetching: false,
                token: action.token,
                isLogged: !!action.token.length
            };
        case UPDATE_LOGIN_EMAIL:
            return {
                ...state,
                loginEmail: action.loginEmail
            };
        case GET_USER_DATA_REQUEST:
            return {...state, isFetching: true};
        case GET_USER_DATA_RESPONSE:
            return {...state, isFetching: false, loggedUser: action.loggedUser,
            oggedUserId: action.logegdUserId};
        case LOGOUT_USER:
            localStorage.clear();
            return {...state, isLogged: false, loggedUser: '', token: '', loggedUserId: null};
        default:
            return state;
    }
};


export default loginReducer;