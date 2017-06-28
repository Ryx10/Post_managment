import { SEARCH_POST, UPDATE_INPUT, REQUEST_POSTS, RECEIVE_POSTS, SHOW_MODAL, HIDE_MODAL } from '../actions/actionTypes';

const initialState = {
    searchValue: '',
    inputValue: '',
    isFetching: false,
    allPosts: [],
    modalIsOpen: false,
    deletingId: ''
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_POST:
            return {...state, searchValue: state.inputValue};
        case UPDATE_INPUT:
            return {...state, inputValue: action.inputValue };
        case REQUEST_POSTS:
            return {...state, isFetching: true};
        case RECEIVE_POSTS:
            return {
                ...state,
                allPosts: action.allPosts,
                isFetching: false
            };
        case SHOW_MODAL:
            return {...state, modalIsOpen: true, deletingId: action.deletingId};
        case HIDE_MODAL:
            return {...state, modalIsOpen: false, deletingId: ''};
        default:
            return state;
    }
};

export default postsReducer;

