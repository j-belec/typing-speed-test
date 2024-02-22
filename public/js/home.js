const homeBtn = document.querySelector(".home__btn");
const engBtn = document.querySelector(".home__btn--eng");
const spaBtn = document.querySelector(".home__btn--spa");

homeBtn.addEventListener("click", function (e) {
  homeBtn.classList.add("disappear");

  engBtn.style.animation = "slide-left 1s";
  engBtn.classList.add("appear");

  spaBtn.style.animation = "slide-right 1s";
  spaBtn.classList.add("appear");
});
