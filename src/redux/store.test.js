import { createStore } from "redux";
import rootReducer from "./reducers/index";
import * as courseActions from "./actions/courseActions";
import initialState from "./reducers/initialState";

it("should handle creating & updating courses", () => {
  //arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    id: 1,
    title: "Clean Code",
  };

  //act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  //assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse.title).toEqual(course.title);

  //act-2
  const updatedCourse = { id: 1, title: "Naya Course" };
  const action2 = courseActions.updateCourseSuccess(updatedCourse);
  store.dispatch(action2);

  //assert-2
  const newUpdatedCourse = store.getState().courses[0];
  expect(newUpdatedCourse.title).toEqual(updatedCourse.title);
});
