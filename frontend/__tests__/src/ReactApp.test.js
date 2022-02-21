import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../src/ReactApp";
import { act } from "react-dom/test-utils";
import socketIOClient from "socket.io-client";
import MockedSocket from "socket.io-mock";
import fetchAPI from "../../utils/fetch-wrapper";

jest.mock("socket.io-client");
jest.mock("../../utils/fetch-wrapper");

let socket;

beforeEach(() => {
  socket = new MockedSocket();
  socketIOClient.mockReturnValue(socket);
  fetchAPI.mockReturnValue({
    data: [
      {
        description:
          "Loved it too, is it any surprise? It's awesome! I actually know more and more people from the movie now!",
        id: 1,
        rating: 4.5,
      },
      {
        description:
          "I have to say this book is much more than a step up from the first book. I thought the first book was ok at best but this book it better on an epic scale. If you are reading this I am assuming you have read the first book.",
        id: 2,
        rating: 4,
      },
      { description: "Plot was meh, but will consider to reread", id: 3, rating: 3.5 },
    ],
    ratingAvg: 4.0,
    ratingAvgFloor: 4,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("loads root component", async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => expect(fetchAPI).toHaveBeenCalledTimes(1));

  const reviewTextEl = await screen.findByText("Reviews");
  expect(reviewTextEl).toBeTruthy();

  const starEls = await screen.findByTestId("stars");
  expect(starEls.childNodes.length).toBe(5);

  const descItemEl = await screen.findByText("Plot was meh, but will consider to reread");
  expect(descItemEl).toBeTruthy();
});
