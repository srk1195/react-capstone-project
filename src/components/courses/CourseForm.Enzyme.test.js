import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

//mock function with default data
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

/* SHALLOW RENDERING 
    -> No child components are rendered.
    -> No DOM is created.
*/
it("renders form and header", () => {
  const wrapper = renderCourseForm();
  //   console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it("label to be 'Save' when saving is set to false ", () => {
  const wrapper = renderCourseForm(); //default is false.
  expect(wrapper.find("button").text()).toBe("Save");
});

it("label to be 'saving...' when saving is set to false ", () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});

/* Rendering via MOUNT 
    -> Child Components are rendered.
    -> DOM is created in memory via JSDOM
    -> Check Header.Enzyme.test.js
*/
