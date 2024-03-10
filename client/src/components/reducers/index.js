import AuthReducer from "./AuthReducer";
import NavReducers from "./NavReducers";
import { combineReducers } from "redux";

export default combineReducers({
    AuthReducer: AuthReducer,
    NavReducers: NavReducers
});