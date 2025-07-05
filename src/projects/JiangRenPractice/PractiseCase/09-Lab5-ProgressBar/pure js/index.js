const progress = document.querySelector(".progress");
const circles = document.querySelectorAll(".circle");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentActive = 1;

nextBtn.addEventListener("click", () => {
  currentActive++;
  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
  updateStyle();
});

prevBtn.addEventListener("click", () => {
  currentActive--;
  if (currentActive < 1) {
    currentActive = 1;
  }
  updateStyle();
});

function updateStyle() {
  circles.forEach((circle, index) => {
    if (index < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  progress.style.width =
    ((currentActive - 1) / (circles.length - 1)) * 100 + "%";
  if (currentActive === 1) {
    prevBtn.disabled = true;
  } else if (currentActive === circles.length) {
    nextBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
}
