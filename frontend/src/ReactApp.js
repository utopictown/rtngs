export function App() {
  return (
    <>
      <main className="home">
        <section className="hero-container">
          <h1>The Minimalist Entrepreneur</h1>
          <div className="hero-review padding">
            <p id="hero-rating" className="rating"></p>
            <div id="hero-stars" className="stars"></div>
            <button id="add-review" className="button">
              Add review
            </button>
          </div>
          <div className="spacer-wrapper flex">
            <div className="spacer w-full"></div>
          </div>
        </section>
        <section className="reviews-container">
          <h3>Reviews</h3>
          <div id="reviews-wrapper"></div>
        </section>
      </main>
      <main id="modal">
        <section className="modal-container">
          <h1>What’s your rating?</h1>
          <span>Rating</span>
          <span id="input-rate" className="input-rate">
            <div className="input-star">
              <label htmlFor="rate-5" data-value="5" id="star-5"></label>
            </div>
            <div className="input-star">
              <label htmlFor="rate-4" data-value="4" id="star-4"></label>
            </div>
            <div className="input-star">
              <label htmlFor="rate-3" data-value="3" id="star-3"></label>
            </div>
            <div className="input-star">
              <label htmlFor="rate-2" data-value="2" id="star-2"></label>
            </div>
            <div className="input-star">
              <label htmlFor="rate-1" data-value="1" id="star-1"></label>
            </div>
            <input type="radio" value="1" name="rate" id="rate-1" />
            <input type="radio" value="2" name="rate" id="rate-2" />
            <input type="radio" value="3" name="rate" id="rate-3" />
            <input type="radio" value="4" name="rate" id="rate-4" />
            <input type="radio" value="5" name="rate" id="rate-5" />
          </span>
          <span>Rating</span>
          <textarea name="input-review" id="input-review" cols="30" rows="10" placeholder="Start typing..."></textarea>
          <button id="submit-review" className="button submit-review">
            Submit review
          </button>
        </section>
      </main>
    </>
  );
}
