import React from "react";

function Stars({ count }) {
  return (
    <span id="input-rate" className="input-rate" data-testid="stars">
      {Array(10)
        .fill()
        .map((_, i) => {
          return (
            <div className="display-star" key={i}>
              <label
                className={(i % 2 == 0 ? "half " : "") + (i + 1 <= count ? "active" : "")}
                onClick={() => handleSelectStar(i)}
              ></label>
            </div>
          );
        })
        .reverse()}
    </span>
  );
}

export default Stars;
