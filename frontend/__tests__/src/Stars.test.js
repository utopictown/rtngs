import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Stars from "../../src/Stars";

test("renders stars component", () => {
  const { container } = render(<Stars count={5} />);
  expect(container).toBeTruthy();
  expect(container.childNodes.length).toBe(5);
});
