import { combineReducers } from "redux";
import { fetchUserAgentDataReducer } from './fetchUserAgentDataReducer';
import { loginAgentReducer } from './loginAgentReducer';
import {agentStatusReducer} from './agentStatusReducer';
import { singleUserDataReducer } from "./singleUserDataReducer";

const reducers = combineReducers({
    fetchUserAgent: fetchUserAgentDataReducer,
    loginStatus: loginAgentReducer,
    agentStatus: agentStatusReducer ,
    singleUserData: singleUserDataReducer
})

export default reducers;