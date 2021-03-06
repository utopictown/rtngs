import React from "react";
import Stars from "./Stars";

function Review({ rating }) {
  return (
    <div className="review flex">
      <div className="review-item flex">
        <div className="stars" data-testid="review__stars">
          <Stars count={rating.rating * 2} />
        </div>
        <p>
          <b>{rating.rating}</b>, <span>{rating.description}</span>
        </p>
      </div>
    </div>
  );
}

export default Review;
