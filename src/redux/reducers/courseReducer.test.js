import CourseReducer from "./courseReducer";
import * as actions from "../actions/courseActions";

it("Should add course when passed CREATE_COURSE_SUCCESS action type", () => {
  //for a reducer we need initial state and action to test.
  // arrange
  const initialState = [
    {
      title: "A",
    },
    {
      title: "B",
    },
  ];

  const newCourse = { title: "C" };

  const action = actions.createCourseSuccess(newCourse);

  //act
  const newState = CourseReducer(initialState, action);

  //assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("should update the course when UPDATE_COURSE_SUCCESS action is fired", () => {
  //arrange
  const initialState = [
    {
      id: 1,
      title: "A",
    },
    {
      id: 2,
      title: "B",
    },
    {
      id: 3,
      title: "C",
    },
  ];

  const course = { id: 2, title: "Naya Course" };
  const action = actions.updateCourseSuccess(course);

  //act
  const newState = CourseReducer(initialState, action);
  const updtaedCourse = newState.find((a) => a.id === course.id);
  const untouchedCourses = newState.filter((a) => a.id !== course.id);

  //assert
  expect(newState.length).toEqual(3);
  expect(newState[1].title).not.toEqual("B");
  expect(newState[1].title).toEqual("Naya Course");
  expect(updtaedCourse.title).toEqual("Naya Course");
  expect(untouchedCourses[0].title).toEqual("A");
});
