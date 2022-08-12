import { configureStore } from "@reduxjs/toolkit";
import userAgentDataReducer from "./slices/userAgentDataSlice";
import realestateDataReducer from "./slices/realestateDataSlice";

const store = configureStore({
  reducer: {
    userAgentData: userAgentDataReducer,
    agentProductsData: realestateDataReducer,
  },
});

export default store;
