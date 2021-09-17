import { SEARCH_QUERY } from "../constants/action-types";

const initialState = {
    query: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_QUERY:
            return {
                ...state,
                query: action.query
            }
        default:
            return state;
    }
}

export default rootReducer