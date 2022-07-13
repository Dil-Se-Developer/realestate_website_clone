import { ActionTypes } from "../constants/action-types";

export const loginAgentActions = (payload) => {
    return {
        type: ActionTypes.LOGIN_STATUS,
        payload: payload
    }
}

