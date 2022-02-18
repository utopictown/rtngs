import React, { useEffect, useState } from "react";

export function App() {
  const initialInputRating = { rating: null, description: "" };
  const initialStarState = Array(5).fill(false);

  const [showModal, setShowModal] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [inputRating, setInputRating] = useState(initialInputRating);
  const [starState, setStarState] = useState(initialStarState);
  const [activeStar, setActiveStar] = useState(null);
  const API_URL = process.env.API_URL;

  useEffect(() => {
    setInputRating({ ...inputRating, rating: starState.filter((item) => item === true).length });
  }, [starState]);

  useEffect(async () => {
    const result = await fetchAPI("GET", API_URL);
    setRatings(result);
  }, []);

  const handleInputDescription = (e) => {
    setInputRating({ ...inputRating, description: e.target.value });
  };

  const handleSelectStar = (i) => {
    let newStars = starState;
    if (activeStar === i) {
      newStars = starState.map(() => false);
      setActiveStar(null);
    } else {
      newStars = starState.map((_, j) => (j === i || j < i ? true : false));
      setActiveStar(i);
    }
    setStarState(newStars);
  };

  const handleSubmit = async () => {
    await fetchAPI("POST", API_URL, inputRating);
    setRatings({ ...ratings, data: [...ratings.data, inputRating] });
    setShowModal(false);
    setActiveStar(null);
    setInputRating(initialInputRating);
    setStarState(initialStarState);
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
              {Array(5)
                .fill()
                .map((_, i) => (
                  <div key={i} className="star-wrapper">
                    <span className="star"></span>
                  </div>
                ))}
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
              ? ratings.data.map((rating, key) => {
                  return (
                    <React.Fragment key={key}>
                      <div className="review flex">
                        <div className="review-item flex">
                          <div className="stars">
                            {Array(5)
                              .fill()
                              .map((_, i) => (
                                <div key={i} className="star-wrapper">
                                  <span className="star"></span>
                                </div>
                              ))}
                          </div>
                          <p>
                            <b>{rating.rating}</b>, <span>{rating.description}</span>
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              : null}
          </div>
        </section>
      </main>
      {showModal ? (
        <main id="modal">
          <section className="modal-container">
            <h1>What’s your rating?</h1>
            <span>Rating</span>
            <span id="input-rate" className="input-rate">
              {starState
                .map((state, i) => {
                  return (
                    <div className="input-star" key={i}>
                      <label className={state ? "active" : ""} onClick={() => handleSelectStar(i)}></label>
                    </div>
                  );
                })
                .reverse()}
            </span>
            <span>Rating</span>
            <textarea
              name="input-review"
              id="input-review"
              cols="30"
              rows="10"
              placeholder="Start typing..."
              onChange={(e) => handleInputDescription(e)}
            ></textarea>
            <button id="submit-review" className="button submit-review" onClick={() => handleSubmit()}>
              Submit review
            </button>
          </section>
        </main>
      ) : null}
    </>
  );
}
