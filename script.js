// HAMBURGER MENU TOGGLE FUNCTION

function toggleMenu() { // defining toggleMenu function
  const menu = document.querySelector(".menu-links"); // use and target an element (HTML line 33) on the webpage
  const icon = document.querySelector(".hamburger-icon"); // use and target an element (HTML line 28) on the webpage
  menu.classList.toggle("open"); // will add/remove open class (CSS line 141) on click
  icon.classList.toggle("open");
}

// ABOUT ME CAROUSEL SLIDER

const carousel = document.querySelector(".carousel"); // use and target an element (HTML line 103) on the webpage
let isDown = false; // isDown refers to whether the mouse button is pressed down or not
let startX; // horizontal position of the mouse pointer 
let scrollLeft; // horizontal scroll position of the carousel

// add event listener to when the mouse is down
carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft; // set to the horizontal position of the mouse pointer relative to the left edge of the carousel
  scrollLeft = carousel.scrollLeft; // set to the current horizontal scroll position of the carousel
});

// add event listener to when the mouse leaves carousel
carousel.addEventListener("mouseleave", () => {
  isDown = false;
});

// add event listener to when the mouse is up
carousel.addEventListener("mouseup", () => {
  isDown = false;
});

// add event listener to when the mouse moves
carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 1; // calculates the distance that the mouse has moved horizontally since the "mousedown" event to determine how much carousel should be scrolled
  carousel.scrollLeft = scrollLeft - walk; //  updates the horizontal scroll position
});

// ABOUT ME CAROUSEL ARROWS

// selecting the left and right arrow elements
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");

// show/hide arrows based on scroll position
const updateArrowsVisibility = () => {
  // if the scroll position is at the beginning, hide the left arrow
  leftArrow.style.display = carousel.scrollLeft === 0 ? "none" : "block";

  // if the scroll position is at the end, hide the right arrow
  const scrollWidth = carousel.scrollWidth;
  const clientWidth = carousel.clientWidth;
  const maxScroll = scrollWidth - clientWidth;
  rightArrow.style.display = carousel.scrollLeft >= maxScroll ? "none" : "block";
};

// manually trigger the scroll event to update arrows visibility on page load
updateArrowsVisibility();

// add event listener to the carousel for scroll event
carousel.addEventListener("scroll", updateArrowsVisibility);

// add event listener to the left arrow
leftArrow.addEventListener("click", () => {
  carousel.scrollLeft -= 210; // moves the carousel left by 420 pixels
});

// add event listener to the right arrow
rightArrow.addEventListener("click", () => {
  carousel.scrollLeft += 210; // moves the carousel right by 420 pixels
});

// DARK/LIGHT MODE

const body = document.querySelector("body");
const darkModeToggle = document.querySelector("#dark-mode-toggle");
const darkModeToggleHamburger = document.querySelector("#dark-mode-toggle-hamburger");
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bxs-moon");

// Select all icons with the class 'icon'
const icons = document.querySelectorAll(".icon, .project-img");

// Set initial dark/light theme based on local storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  setDarkMode();
} else {
  setLightMode();
}

// Event listener for main tab toggles
darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    setDarkMode();
  } else {
    setLightMode();
  }
});

// Event listener for hamburger menu toggles
darkModeToggleHamburger.addEventListener("change", () => {
  if (darkModeToggleHamburger.checked) {
    setDarkMode();
  } else {
    setLightMode();
  }
});

  // Funciton to set dark mode
  function setDarkMode() {
    body.setAttribute("theme", "dark");
    localStorage.setItem("theme", "dark");
    sunIcon.classList.remove("bxs-sun");
    sunIcon.classList.add("bx-sun");
    moonIcon.classList.remove("bx-moon");
    moonIcon.classList.add("bxs-moon");
    darkModeToggle.checked = true;
    darkModeToggleHamburger.checked = true;
    updateIconSources('dark');
  }
  
  // Function to set light mode
  function setLightMode() {
    body.removeAttribute("theme");
    localStorage.setItem("theme", "light");
    sunIcon.classList.remove("bx-sun");
    sunIcon.classList.add("bxs-sun");
    moonIcon.classList.remove("bxs-moon");
    moonIcon.classList.add("bx-moon");
    darkModeToggle.checked = false;
    darkModeToggleHamburger.checked = false;
    updateIconSources('light');
  }

  function updateIconSources(theme) {
    icons.forEach(icon => {
      const lightSrc = icon.getAttribute('src-light');
      const darkSrc = icon.getAttribute('src-dark');
      if (theme === 'dark') {
        icon.src = darkSrc;
      } else {
        icon.src = lightSrc;
      }
    });
  }
