import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Review from "../../src/Review";

test("renders Review component", async () => {
  const { container } = render(<Review rating={5} />);
  expect(container).toBeTruthy();
  const starEls = await screen.findByTestId("review__stars");
  expect(starEls.childNodes.length).toBe(5);
});
