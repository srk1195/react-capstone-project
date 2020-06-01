import React from "react";
import { shallow } from "enzyme";
import HomePage from "../home/HomePage";

it("rendering App Component", () => {
  const wrapper = shallow(<HomePage />);
  expect(wrapper.find("h1").text()).toBe(" Pluralsight Administration ");
});
