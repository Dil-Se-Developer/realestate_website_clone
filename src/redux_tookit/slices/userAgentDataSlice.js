import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserAgentData = createAsyncThunk(
  "usersagent/fetchUserAgent",
  async () => {
    const response = await axios.get(`http://localhost:5000/alluserdata`);
    return response.data;
  }
);

export const addUserData = createAsyncThunk(
  "usersagent/addUser",
  async (data) => {
    await axios.post(`http://localhost:5000/alluserdata`, data);
  }
);

export const updateUserData = createAsyncThunk(
  "usersagent/updateUser",
  async (existingValues) => {
    await axios.put(
      `http://localhost:5000/alluserdata/${existingValues.id}`,
      existingValues
    );
  }
);

const defaultUserAgentState = {
  loginStatus: false,
  singleUserData: {},
  agentStatus: false,
  UserAgentData: [],
};

const userAgentDataSlice = createSlice({
  name: "userAgentData",
  initialState: defaultUserAgentState,
  reducers: {
    setLoginStatus: (state, { payload }) => {
      state.loginStatus = payload;
    },
    setAgentStatus: (state, { payload }) => {
      state.agentStatus = payload;
    },
    setSingleUserData: (state, { payload }) => {
      state.singleUserData = { ...payload };
    },
  },
  extraReducers: {
    [fetchUserAgentData.fulfilled]: (state, { payload }) => {
      state.UserAgentData = [...payload];
    },
  },
});

export const { setLoginStatus, setAgentStatus, setSingleUserData } =
  userAgentDataSlice.actions;
export default userAgentDataSlice.reducer;
