import { TITLE_VALIDATION, BODY_VALIDATION, USER_VALIDATION, LOGIN_VALIDATION, PASSWORD_VALIDATION } from '../actions/actionTypes';
import validate from '../utils/validate';

const initialState = {
    titleIsValid: false,
    bodyIsValid: false,
    userIsValid: false,
    loginIsValid: false,
    passwordIsValid: false
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TITLE_VALIDATION:
            return {
                ...state,
                titleIsValid: validate(action.value, 'text')
            };
        case BODY_VALIDATION:
            return {
                ...state,
                bodyIsValid: validate(action.value, 'text')
            };
        case USER_VALIDATION:
            return {
                ...state,
                userIsValid: validate(action.value, 'text')
            };
        case LOGIN_VALIDATION:
            return {
                ...state,
                loginIsValid: validate(action.value, 'email')
            };
        case PASSWORD_VALIDATION:
            return {
                ...state,
                passwordIsValid: validate(action.value, 'text')
            };
        default:
            return state;
    }
};

export default postsReducer;

