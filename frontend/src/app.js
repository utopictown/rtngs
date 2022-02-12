// selector
const modal = document.getElementById("modal");
const modalContainer = modal.getElementsByClassName("modal-container")[0];
const reviewsContainer = document.getElementsByClassName("reviews-container")[0];
const addButton = document.getElementById("add-review");
const submitReview = document.getElementById("submit-review");
const starReview = document.querySelectorAll(".input-star label");
// end of selector

// variables
const MAX_STARS = 5;
// end of variables

// style modification
modalContainer.style.bottom = "-100vh";
modal.style.opacity = 0;
modal.style.zIndex = -1;
// end of style modification

// event listener
modal.addEventListener("click", (e) => handleModalClick(e));
addButton.addEventListener("click", () => toggle(true));
submitReview.addEventListener("click", (e) => handleSubmitButtonClick(e));

const starCount = starReview.length;
let rating = 0;
for (const star of starReview) {
  star.addEventListener("click", (e) => handleStarClick(e));
}
// end of event listener

const toggle = (isActive = true) => {
  if (isActive === true) {
    modal.style.opacity = 1;
    modal.style.zIndex = 999;
    modalContainer.style.bottom = 0;
  } else {
    rating = 0;
    resetStar();
    modal.style.opacity = 0;
    modal.style.zIndex = -1;
    modalContainer.style.bottom = "-50vh";
  }
};

const resetStar = () => {
  for (let i = 0; i < starCount; i++) {
    if (starReview[i].classList.contains("active")) starReview[i].classList.remove("active");
  }
};

const handleModalClick = (e) => {
  if (e.target.id && e.target.id === "modal") {
    toggle(false);
  }
};

const handleStarClick = (e) => {
  const ratingValue = e.target.dataset.value;

  resetStar();

  if (rating != ratingValue) {
    for (let i = ratingValue; i > 0; i--) {
      starReview[starCount - i].classList.add("active");
    }
    rating = ratingValue;
  } else {
    rating = 0;
  }
};

const handleSubmitButtonClick = async (e) => {
  e.preventDefault();
  const rateSelector = document.querySelector("input[name=rate]:checked");
  const rating = rateSelector ? rateSelector.value : null;
  const description = document.getElementById("input-review").value;

  if (rating && description) {
    await fetchAPI("POST", "http://127.0.0.1:5000", {
      rating,
      description,
    });
    toggle(false);
  }
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

const init = async () => {
  const data = await fetchAPI("GET", "http://127.0.0.1:5000");
  data.data.forEach((review) => {
    let stars = Array(Math.floor(review.rating))
      .fill()
      .map(
        () =>
          `<div class="star-wrapper">
            <span class="star"></span>
          </div>`
      )
      .join("");

    if (Math.floor(review.rating) < MAX_STARS) {
      stars += Array(MAX_STARS - Math.floor(review.rating))
        .fill()
        .map(
          () =>
            `<div class="star-wrapper">
          <span class="empty-star"></span>
        </div>`
        )
        .join("");
    }

    const reviewElement = `
      <div class="review flex">
        <div class="review-item flex">
          <div class="stars">
          ${stars}
          </div>
          <span>
            <b>${review.rating}</b>, ${review.description}
          </span>
        </div>
      </div>
      `;
    reviewsContainer.innerHTML += reviewElement;
  });
};

init();
