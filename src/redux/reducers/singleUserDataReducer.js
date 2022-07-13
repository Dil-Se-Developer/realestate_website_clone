import { ActionTypes } from "../constants/action-types";


const defaultState = {
    singleUserData: {}
}

export const singleUserDataReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SINGLE_USER_DATA:
            return {
                ...state,
                singleUserData: {...payload},
            }
        default:
            return state
    }
}