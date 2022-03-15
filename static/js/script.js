"use strict";

const nav = document.querySelector(".nav_bar");

// Dealing with the nav bar
const navHandler = function (e) {
  // Get all the links on nav bar
  if (e.target.classList.contains("nav_bar__link")) {
    // Current link
    const link = e.target;
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
