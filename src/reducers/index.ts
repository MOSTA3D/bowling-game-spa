import playersReducer from "./playersReducer";
import winnerReducer from "./winnerReducer";

import { combineReducers } from "redux";

export default combineReducers({playersReducer, winnerReducer});