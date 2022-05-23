import { combineReducers } from "redux";
import studentReducer from "./index";

const rootReducer = combineReducers({
  student: studentReducer,
});

export default rootReducer;