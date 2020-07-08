const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CAND_DETAILS':
            return {
                ...state,
                ...{candidateDetails: action.payload}
            };
        case 'REMOVE_CAND_DETAILS':
            return {
                ...state,
                ...{candidateDetails: null}
            };
        case 'SET_AUTH':
            return {
                ...state,
                ...{auth: true}
            };
        case 'REMOVE_AUTH':
            return {
                ...state,
                ...{auth: false}
            };
        default:
            return state;
    }
};
export default Reducer;
