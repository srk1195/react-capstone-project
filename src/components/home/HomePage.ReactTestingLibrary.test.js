import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, screen } from "react-testing-library";
import HomePage from "../home/HomePage";

afterEach(cleanup);

it("should render the HomePage", () => {
  render(
    <MemoryRouter>
      <HomePage></HomePage>
    </MemoryRouter>
  );
  // screen.getByText("hello");
});
