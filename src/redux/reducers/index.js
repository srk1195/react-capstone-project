// > similar to this import courseReducer as courses from "./courseReducer". As default exports can have any name while importing
import courses from "./courseReducer";
import { combineReducers } from "redux";
import authors from "./authorReducer";
import apiCallStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  apiCallsInProgress: apiCallStatusReducer,
});

export default rootReducer;
