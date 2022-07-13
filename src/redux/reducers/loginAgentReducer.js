import { ActionTypes } from "../constants/action-types";

const defaultUserAgentState = {
    loginStatus: false
}

export const loginAgentReducer = (state = defaultUserAgentState, { type, payload }) => {
    switch (type) {
        case ActionTypes.LOGIN_STATUS:
            return {
                ...state,
                loginStatus: payload
            }
        default:
            return state
    }
}