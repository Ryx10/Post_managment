import { combineReducers } from 'redux';
import postReducer from './postReducer';
import postDataReducer from './postDataReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
    post: postReducer,
    postData: postDataReducer,
    login: loginReducer
});

export default rootReducer;