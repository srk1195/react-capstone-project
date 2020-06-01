import React from "react";
import { mount } from "enzyme";
import { ManageCoursePage } from "./ManageCoursePage";
import { courses, authors, newCourse } from "../../../tools/mockData";

function render(args) {
  const defaultProps = {
    courses,
    authors,
    // Passed from React router in real-app (store->provider->components), so just stubbing in for test.
    // You can use MemoryRouter like in Header.test.js.
    // Else wrap it with React Router to test its behavior.
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {},
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageCoursePage {...props} />);
}

describe("ManageCourse Page Testing", () => {
  it("sets error when attempting to save an empty title field", () => {
    const wrapper = render();
    // console.log(wrapper.debug());
    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("Title is required!");
  });

  it("default Option set to Select Author", () => {
    const wrapper = render();
    const defaultSetting = wrapper.find("SelectInput").props().defaultOption;
    expect(defaultSetting).toBe("Select Author");
  });
});
