import React from "react";

function Stars({ count }) {
  return Array(5)
    .fill()
    .map((_, i) => (
      <div key={i} className="star-wrapper">
        <span className={i + 1 <= count ? "star" : "empty-star"}></span>
      </div>
    ));
}

export default Stars;
