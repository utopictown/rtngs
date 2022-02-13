// selector
const modal = document.getElementById("modal");
const modalContainer = modal.getElementsByClassName("modal-container")[0];
const reviewsWrapper = document.getElementById("reviews-wrapper");
const addButton = document.getElementById("add-review");
const submitReview = document.getElementById("submit-review");
const starReview = document.querySelectorAll(".input-star label");
const heroRatingEl = document.getElementById("hero-rating");
const heroStarsEl = document.getElementById("hero-stars");
const inputReview = document.getElementById("input-review");
// end of selector

// elements
const starElements = `<div class="star-wrapper">
                        <span class="star"></span>
                      </div>`;

const emptyStarElements = `<div class="star-wrapper">
                            <span class="empty-star"></span>
                          </div>`;
// end of elements

// variables
const MAX_STARS = 5;
const API_URL = process.env.API_URL;
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
    inputReview.value = "";
    modal.style.opacity = 0;
    modal.style.zIndex = -1;
    modalContainer.style.bottom = "-50vh";
  }
};

const resetStar = () => {
  const inputRate = document.querySelectorAll("input[name=rate]");
  for (let i = 0; i < starCount; i++) {
    if (starReview[i].classList.contains("active")) {
      starReview[i].classList.remove("active");
    }
    inputRate[i].checked = false;
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
  const description = inputReview.value;

  if (rating && description) {
    const data = await fetchAPI("POST", API_URL, {
      rating,
      description,
    });
    reviewsWrapper.innerHTML += renderReview(rating, description);
    heroRatingEl.innerHTML = data.ratingAvg;
    heroStarsEl.innerHTML = renderStars(data.ratingAvg);
    toggle(false);
  }
};

const renderReview = (rating, description) => {
  const stars = renderStars(rating);
  return `
  <div class="review flex">
    <div class="review-item flex">
      <div class="stars">
      ${stars}
      </div>
      <span>
        <b>${rating}</b>, ${description}
      </span>
    </div>
  </div>
  `;
};

const renderStars = (rating) => {
  let stars = Array(Math.floor(rating))
    .fill()
    .map(() => starElements)
    .join("");

  if (Math.floor(rating) < MAX_STARS) {
    stars += Array(MAX_STARS - Math.floor(rating))
      .fill()
      .map(() => emptyStarElements)
      .join("");
  }
  return stars;
};

const loadReviews = async () => {
  const data = await fetchAPI("GET", API_URL);
  data.data.forEach((review) => {
    reviewsWrapper.innerHTML += renderReview(review.rating, review.description);
  });
  heroRatingEl.innerHTML = data.ratingAvg;
  heroStarsEl.innerHTML = renderStars(data.ratingAvg);
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
  await loadReviews();
};

init();
