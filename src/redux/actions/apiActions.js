import { ActionTypes } from "../constants/action-types";

export const fetchUserAgentData = (useragentdata) => {
  return {
    type: ActionTypes.FETCH_USER_AGENT_DATA,
    payload: useragentdata,
  };
};

export const errorFetchUserAgentData = (error) => {
  return {
    type: ActionTypes.ERROR_FETCH_USER_AGENT_DATA,
    payload: error,
  };
};
