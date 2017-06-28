import { SEARCH_POST, UPDATE_INPUT, REQUEST_POSTS, RECEIVE_POSTS } from '../actions/actionTypes';
import {combineReducers} from 'redux';

const initialState = {
    searchValue: '',
    inputValue: '',
};

const searchPostsReducer = (state = initialState, action) => {
        switch (action.type) {
            case SEARCH_POST:
                return {...state, searchValue: state.inputValue};
            case UPDATE_INPUT:
                console.log('update input')
                return {...state, inputValue: action.inputValue };
            default:
                return state;
        }
};
const getPosts = (state = {
    isFetching: false,
    didInvalidate: false,
    allPosts: []
}, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_POSTS:
            console.log(action, 1)
            return Object.assign({}, state, {
                allPosts: action.allPosts,
                isFetching: false
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    searchPostsReducer,
    getPosts
});

//const rootReducer = searchPostsReducer;

export default rootReducer;