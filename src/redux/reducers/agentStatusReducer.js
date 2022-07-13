import { ActionTypes } from "../constants/action-types";

const defaultUserAgentState = {
    agentStatus: false
}

export const agentStatusReducer = (state = defaultUserAgentState, { type, payload }) => {
    switch (type) {
        case ActionTypes.AGENT_STATUS:
            return {
                ...state,
                agentStatus: payload
            }
        default:
            return state
    }
}