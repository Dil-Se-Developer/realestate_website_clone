import { ActionTypes } from "../constants/action-types";

export const singleUserDataActions = (payload) => {
    return {
        type: ActionTypes.SINGLE_USER_DATA,
        payload: payload
    }
}
