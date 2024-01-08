import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./";

describe("Nav bar renders correct components within the Router", () => {
  it("renders 2 links", () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });
});
