import { combineReducers } from "redux";
import { fetchUserAgentDataReducer} from './fetchUserAgentDataReducer';

const reducers = combineReducers ({
    fetchUserAgent: fetchUserAgentDataReducer
})

export default reducers;