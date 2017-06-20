import { combineReducers } from 'redux';
import reducers from '../reducers';
import fetchCommentsReducer from './fetchCommentsReducer';

const reducers = combineReducers(
    fetchCommentsReducer
);

 export default reducers;