import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

//Test an Async action
const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore(); // cleanup after each test to preserve the data.
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL & LOAD_COURSE_SUCCESS when loading courses", () => {
      //it will be fired instead of any API calls and the sends the setted resp.
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" },
      });

      //Assert this actions are created.
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses },
      ];

      //mock redux store
      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("Create Course Success", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    //arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };

    //act
    const action = courseActions.createCourseSuccess(course);

    //assert
    expect(action).toEqual(expectedAction); // we are checking the object skeleton
  });

  it("Should create a LOAD_COURSE_SUCCESS action", () => {
    //arrange
    const expectedAction = {
      type: types.LOAD_COURSES_SUCCESS,
      courses: [],
    };

    // act
    const action = courseActions.loadCoursesSuccess([]);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
