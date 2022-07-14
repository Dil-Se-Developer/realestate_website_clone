import { combineReducers } from "redux";
import { fetchUserAgentDataReducer } from './fetchUserAgentDataReducer';
import { loginAgentReducer } from './loginAgentReducer';
import {agentStatusReducer} from './agentStatusReducer';
import { singleUserDataReducer } from "./singleUserDataReducer";
import { fetchProductsReducer } from "./fetchProductsReducer";

const reducers = combineReducers({
    fetchUserAgent: fetchUserAgentDataReducer,
    loginStatus: loginAgentReducer,
    agentStatus: agentStatusReducer ,
    singleUserData: singleUserDataReducer,
    agentProductsData: fetchProductsReducer
})

export default reducers;