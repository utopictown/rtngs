const modal = document.getElementById("modal");
modal.style.opacity = 0;
modal.style.zIndex = -1;
const modalContainer = modal.getElementsByClassName("modal-container")[0];
modalContainer.style.bottom = "-100vh";

modal.addEventListener("click", function (e) {
  if (e.target.id && e.target.id === "modal") {
    toggle(false);
  }
});

const addButton = document.getElementById("add-review");
addButton.addEventListener("click", () => toggle(true));

const submitReview = document.getElementById("submit-review");
submitReview.addEventListener("click", () => toggle(false));

// asign rating value to star
const starReview = document.querySelectorAll(".input-star label");
const starCount = starReview.length;
let rating = 0;

for (const star of starReview) {
  star.addEventListener("click", function (e) {
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
  });
}

function toggle(isActive = true) {
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
}

function resetStar() {
  for (let i = 0; i < starCount; i++) {
    if (starReview[i].classList.contains("active"))
      starReview[i].classList.remove("active");
  }
}
