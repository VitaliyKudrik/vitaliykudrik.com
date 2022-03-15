"use strict";
// Nav elements
const nav = document.querySelector(".nav_bar");
// Slide elements
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const sliderLeftBtn = document.querySelector(".slider__btn--left");
const sliderRightBtn = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");
// Dealing with the nav bar
const navHandler = function (e) {
  // Get all the links on nav bar
  if (e.target.classList.contains("nav_bar__link")) {
    // Current link
    const link = e.target;
    // Make the nav bar buttons smooth scroll to correct location
    link.addEventListener("click", function () {
      if (link.getAttribute("name").at(-1) === "1") {
        section1.scrollIntoView({ behavior: "smooth" });
      } else if (link.getAttribute("name").at(-1) === "2") {
        section2.scrollIntoView({ behavior: "smooth" });
      }
    });

    // Other links next to current link
    const otherLinks = link
      .closest(".nav_bar")
      .querySelectorAll(".nav_bar__link");
    const logo = link.closest(".nav_bar").querySelector("img");
    logo.style.opacity = this;
    otherLinks.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

// Setting opacity of link elements using bind and 'this' keyword
nav.addEventListener("mouseover", navHandler.bind(0.25));
nav.addEventListener("mouseout", navHandler.bind(1));

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Make the slider smaller
slider.style.transform = `scale(0.5)`;

// Init slides values
let currentSlide = 0;
const lastSlide = slides.length;

// Moves to a selected slide
const selectSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// Moves to the next available right slide
const rightSlide = function () {
  if (currentSlide === lastSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  selectSlide(currentSlide);
  activateDot(currentSlide);
};

// Moves to the next available right slide
const leftSlide = function () {
  if (currentSlide === 0) {
    currentSlide = lastSlide - 1;
  } else {
    currentSlide--;
  }
  selectSlide(currentSlide);
  activateDot(currentSlide);
};

// Create the slider dots at the bottom
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

// This updates currently active dot
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

// Initialize slides to first slide and create dots
selectSlide(0);
createDots();
activateDot(0);

sliderRightBtn.addEventListener("click", rightSlide);
sliderLeftBtn.addEventListener("click", leftSlide);

// Allows keypresses to move the slider images
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    leftSlide();
  } else if (e.key === "ArrowRight") {
    rightSlide();
  }
});
// Allows clicking on the dots to move to different images
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    selectSlide(slide);
    activateDot(slide);
  }
});
