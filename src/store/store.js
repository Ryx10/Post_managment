import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/';
import thunkMiddleware from 'redux-thunk';

const store = (preloadedState) => {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware)
    );
};

export default store;