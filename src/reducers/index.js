import { combineReducers } from 'redux';
import postReducer from './postReducer';
import postDataReducer from './postDataReducer';
import loginReducer from './loginReducer';
import validationReducer from './validationReducer';

const rootReducer = combineReducers({
    post: postReducer,
    postData: postDataReducer,
    login: loginReducer,
    validation: validationReducer 
});

export default rootReducer;