import { SEARCH_QUERY } from "../constants/action-types"

export const searchQuery = (query) => {
    return {
        type: SEARCH_QUERY,
        query
    }
}
