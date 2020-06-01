import React from "react";
import Header from "./Header";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// Shallow Example. searches raw JSX
it("Contains 4 Navlinks via Shallow technique", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(4);
});

// Same thing via Mount. It generates the final DOM. So, you need to search elements/CSS as per it.
// We also need to pull in React Router's memoryRouter since the Header expects to have React's Routers props passed.

it("Contains 4 anchors via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  expect(numAnchors).toEqual(4);
});

//debugging output
// it("show debugging output", () => {
//   const wrapper = shallow(<Header />); //esline-disable-line
//   // console.log(wrapper.debug());
// });
