const searchForPostReducer = (state, action) => {
    if(action.type === 'SEARCH_FOR_POSTS'){
        const searchValue = state.inputValue;
        return {...state, searchValue};
    } else if(action.type === 'UPDATE_INPUT_VALUE') {
        const inputValue = action.value;
        return {...state, inputValue: inputValue}
    }else {
        return state;
    }
}

export default searchForPostReducer;