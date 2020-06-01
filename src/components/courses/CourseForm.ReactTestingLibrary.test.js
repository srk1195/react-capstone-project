import React from "react";
import { render, cleanup } from "react-testing-library";
import CourseForm from "./CourseForm";
afterEach(cleanup);

//Factory data
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
  return render(<CourseForm {...props} />);
}

it("should render Add course Header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("Should have label as 'save' when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("Should have lable as 'saving...' when it is saved", () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving..."); // auto assertions in this lib.
});
