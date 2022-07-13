import { ActionTypes } from "../constants/action-types";

export const agentStautsActions = (payload) => {
    return {
        type: ActionTypes.AGENT_STATUS,
        payload: payload
    }
}