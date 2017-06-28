import { combineReducers } from 'redux';
import postReducer from './postReducer';
import postDataReducer from './postDataReducer';

const rootReducer = combineReducers({
    post: postReducer,
    postData: postDataReducer
});

export default rootReducer;