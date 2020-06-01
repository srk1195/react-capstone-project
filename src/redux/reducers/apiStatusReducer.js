import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    //logic
    return state - 1;
  } else {
    return state;
  }
}

// any given action will  trigger multiple reducers
// multiple reducers will work on same or multiple actions.
// LOAD_COURSE_SUCCESS action is fired it will dealt in courseReducer & in this reducer.
// LOAD_COURSE_SUCCESS is fired when the api call is completed.
