const fetchCommentsReducer = (state, action) => {
    if(action.type === 'FETCH_COMMENTS'){
        const comments = action.comments;
        return {...state, comments};
    } else {
        return state;
    }
}

export default fetchCommentsReducer;