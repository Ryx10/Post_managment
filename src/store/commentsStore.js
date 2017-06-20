import { createStore } from 'redux';
import fetchCommetnsReducer from '../reducers/fetchCommentsReducer';

const commentStore = createStore(fetchCommetnsReducer, {comments: []});

export default commentStore;