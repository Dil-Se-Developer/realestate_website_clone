import { ActionTypes } from "../constants/action-types";

const defaultUserAgentState = {
    UserAgentData: [],
    FetchError: ''
}

export const fetchUserAgentDataReducer = (state = defaultUserAgentState, {type, payload}) => {
    switch (type) {
        case ActionTypes.FETCH_USER_AGENT_DATA : 
        return {
            ...state,
            UserAgentData: [...payload]
        }

        case ActionTypes.ERROR_FETCH_USER_AGENT_DATA: 
        return {
            ...state,
            FetchError: payload
        }
        default: 
        return state
    }
}