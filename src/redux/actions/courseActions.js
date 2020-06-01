import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

//createCourse() is action creator. It is just returning an action.
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

//thunk
export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => dispatch(loadCoursesSuccess(courses))) // you can inline the {type: ... , courses}
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//thunk
export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//thunk
export function deleteCourse(course) {
  return function (dispatch) {
    // Doing an Optmistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we are not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
