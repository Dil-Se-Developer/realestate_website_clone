import { ActionTypes } from "../constants/action-types";

const defaultAgentProductsState = {
    agentProductsData: []
}

export const fetchProductsReducer = (state = defaultAgentProductsState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_AGENT_PRODUCTS_DATA:
            return {
                ...state,
                agentProductsData: [...payload]
            }
        default:
            return state
    }
}