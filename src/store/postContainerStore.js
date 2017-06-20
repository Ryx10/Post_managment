import { createStore } from 'redux';
import searchForRostReducer from '../reducers/searchForPostReducer';

const searchForPostStore = createStore(searchForRostReducer, {searchValue: '', inputValue: ''});

export default searchForPostStore;