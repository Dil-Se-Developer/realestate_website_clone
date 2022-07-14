import { fetchUserAgentData, errorFetchUserAgentData } from "./apiActions";
import axios from "axios";

export const fetchUserAgentAction = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`http://localhost:5000/alluserdata`);
      dispatch(fetchUserAgentData(response.data));
    } catch (error) {
      dispatch(errorFetchUserAgentData(error.message));
    }
  };
};

export const addUserData = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/alluserdata`,
        data
      );
      dispatch(fetchUserAgentAction());
      return response
    } catch (error) {
      return error.message
    }
  };
};


export const updateUserData = (existingValues) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/alluserdata/${existingValues.id}`,
        existingValues
      );
      dispatch(fetchUserAgentAction());
      return response
    } catch (error) {
      return error.message
    }
  };
};


