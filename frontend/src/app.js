const modal = document.getElementById("modal");
modal.style.opacity = 0;
modal.style.zIndex = -1;
const modalContainer = modal.getElementsByClassName("modal-container")[0];
modalContainer.style.bottom = "-100vh";

const addButton = document.getElementById("add-review");
addButton.addEventListener("click", () => toggle(true));

const submitReview = document.getElementById("submit-review");
submitReview.addEventListener("click", () => toggle(false));

function toggle(isActive = true) {
  if (isActive === true) {
    modal.style.opacity = 1;
    modal.style.zIndex = 999;
    modalContainer.style.bottom = 0;
  } else {
    modal.style.opacity = 0;
    modal.style.zIndex = -1;
    modalContainer.style.bottom = "-100vh";
  }
}
