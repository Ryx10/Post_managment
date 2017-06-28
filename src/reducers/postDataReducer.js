import {RECEIVE_POST_DATA, REQUEST_POST_DATA, POST_UPDATE} from '../actions/actionTypes';

const initialState = {
    showPreloader: false,
    users: [],
    title: '',
    body: '',
    userId: 0,
    comments: []
};

const postDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_POST_DATA:
            return {...state, showPreloader: true};
        case RECEIVE_POST_DATA:
        case POST_UPDATE:
            return {...state, ...action};
        default:
            return state;
    }
};

export default postDataReducer;