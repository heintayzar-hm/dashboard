import { combineReducers } from "redux";
import auth from "./auth/auth";


const rootReducer = combineReducers({
    // Add your reducers here
    authReducer: auth,
});

export default rootReducer;
