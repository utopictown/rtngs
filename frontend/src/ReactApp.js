import React, { useEffect, useState } from "react";
import Review from "./Review";
import Stars from "./Stars";
import { io } from "socket.io-client";

export function App() {
  const API_URL = process.env.API_URL;
  const initialInputRating = { rating: 0, description: "" };
  const initialStars = Array(5).fill(false);
  const initialErrorMessages = { rating: null, description: null };

  const [showModal, setShowModal] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [inputRating, setInputRating] = useState(initialInputRating);
  const [stars, setStars] = useState(initialStars);
  const [activeStar, setActiveStar] = useState(null);
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages);
  const [canSubmit, setCanSubmit] = useState(false);
  const [socketClient, setSocketClient] = useState(null);

  useEffect(() => {
    const socket = io(API_URL + "/rtngs");
    setSocketClient(socket);
    socket.on("new_review", async (data) => {
      console.log(data);
      setRatings(data);
    });
  }, []);

  useEffect(() => {
    setInputRating({ ...inputRating, rating: stars.filter((item) => item === true).length });
  }, [stars]);

  useEffect(() => {
    setActiveStar(null);
    setInputRating(initialInputRating);
    setStars(initialStars);
  }, [showModal]);

  useEffect(async () => {
    const result = await fetchAPI("GET", API_URL);
    setRatings(result);
  }, []);

  const handleInputDescription = (e) => {
    setInputRating({ ...inputRating, description: e.target.value });
  };

  const handleSelectStar = (i) => {
    let newStars = stars;
    if (activeStar === i) {
      newStars = stars.map(() => false);
      setActiveStar(null);
    } else {
      newStars = stars.map((_, j) => (j === i || j < i ? true : false));
      setActiveStar(i);
    }
    setStars(newStars);
  };

  const handleSubmit = async () => {
    let err = { rating: "", description: "" };

    if (inputRating.rating === 0) err.rating = "Star is required";
    if (inputRating.description === "") err.description = "Description is required";

    setErrorMessages({ ...errorMessages, ...err });

    const _canSubmit = checkIfErrorExist(err) ? false : true;
    setCanSubmit(_canSubmit);

    if (_canSubmit) {
      await fetchAPI("POST", API_URL, inputRating);
      if (socketClient) socketClient.emit("submit_review");
      // setRatings({ ...ratings, data: [...ratings.data, inputRating], ratingAvg: response.ratingAvg });
      setShowModal(false);
      setErrorMessages(initialErrorMessages);
    }
  };

  const handleModalClick = (e) => {
    if (e.target.id && e.target.id === "modal") setShowModal(false);
  };

  const checkIfErrorExist = (err) => {
    return Object.keys(err).filter((keys) => err[keys] !== "").length > 0;
  };

  const fetchAPI = async (method, url, payload = {}) => {
    const resources = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method ?? "GET",
      body: method != "GET" ? JSON.stringify(payload) : null,
    };

    const data = await fetch(url, resources);

    let result = {
      status: data.status,
      ok: data.ok,
    };

    if (data.ok === true) {
      result = { ...result, ...(await data.json()) };
    } else {
      result = [];
    }

    return result;
  };

  return (
    <>
      <main className="home">
        <section className="hero-container">
          <h1>The Minimalist Entrepreneur</h1>
          <div className="hero-review padding">
            <p id="hero-rating" className="rating">
              {ratings ? ratings.ratingAvg : ""}
            </p>
            <div id="hero-stars" className="stars">
              <Stars count={ratings ? Math.floor(ratings.ratingAvg) : 0} />
            </div>
            <button id="add-review" className="button" onClick={() => setShowModal(!showModal)}>
              Add review
            </button>
          </div>
          <div className="spacer-wrapper flex">
            <div className="spacer w-full"></div>
          </div>
        </section>
        <section className="reviews-container">
          <h3>Reviews</h3>
          <div id="reviews-wrapper">
            {ratings && ratings.data.length
              ? ratings.data.map((rating, key) => <Review key={key} rating={rating} />)
              : null}
          </div>
        </section>
      </main>
      {showModal ? (
        <main id="modal" onClick={(e) => handleModalClick(e)}>
          <section className="modal-container">
            <h1>What’s your rating?</h1>
            <span>Rating</span>
            <span id="input-rate" className="input-rate">
              {stars
                .map((state, i) => {
                  return (
                    <div className="input-star" key={i}>
                      <label className={state ? "active" : ""} onClick={() => handleSelectStar(i)}></label>
                    </div>
                  );
                })
                .reverse()}
            </span>
            <span>Review</span>
            <textarea
              name="input-review"
              id="input-review"
              cols="30"
              rows="6"
              placeholder="Start typing..."
              onChange={(e) => handleInputDescription(e)}
            ></textarea>
            <button id="submit-review" className="button submit-review" onClick={() => handleSubmit()}>
              Submit review
            </button>
            {canSubmit
              ? null
              : Object.keys(errorMessages).map((error, i) => (
                  <span key={i} className="error">
                    {errorMessages[error]}
                  </span>
                ))}
          </section>
        </main>
      ) : null}
    </>
  );
}
