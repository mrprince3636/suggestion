let currentSlide = 0;
let interval;

const slides = document.querySelectorAll(".slide"); // Cache slides
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });

  // Update active dot
  updateDots(index);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function updateDots(index) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.remove("active");
    if (i === index) {
      dot.classList.add("active");
    }
  });
}

function createDots() {
  const dotContainer = document.createElement("div");
  dotContainer.classList.add("dots");
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
    dotContainer.appendChild(dot);
  });
  document.querySelector(".slider").appendChild(dotContainer);
}

function startSlider() {
  interval = setInterval(nextSlide, 5000);
}

function stopSlider() {
  clearInterval(interval);
}

// Initialize the slider
createDots();
showSlide(currentSlide);
startSlider();

// Pause slider on hover
const slider = document.querySelector(".slider");
slider.addEventListener("mouseover", stopSlider);
slider.addEventListener("mouseout", startSlider);

// Add navigation buttons
document.querySelector(".slider").insertAdjacentHTML(
  "beforeend",
  `
  <button class="prev" onclick="prevSlide()">&#10094;</button>
  <button class="next" onclick="nextSlide()">&#10095;</button>
  `
);
// Initialize AOS
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true, // Animation happens only once
  });
});
document.getElementById('calculator-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const length = parseFloat(document.getElementById('length').value);
  const width = parseFloat(document.getElementById('width').value);
  const tileSize = parseFloat(document.getElementById('tile-size').value);

  // Calculate the area of the room in square meters
  const roomArea = length * width;

  // Convert tile size from cm to meters (since room area is in meters)
  const tileArea = (tileSize / 100) * (tileSize / 100); // area of one tile in square meters

  // Calculate the number of tiles required (round up to the nearest whole tile)
  const numberOfTiles = Math.ceil(roomArea / tileArea);

  // Display the result
  document.getElementById('result').innerHTML = `
    <p>Total Tiles Needed: <strong>${numberOfTiles}</strong></p>
  `;
});
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const increment = target / 100; // Adjust speed
          let current = 0;

          const updateCounter = () => {
            if (current < target) {
              current = Math.min(current + increment, target);
              counter.innerText = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target; // Ensure exact value at the end
            }
          };

          updateCounter();
          observer.unobserve(counter); // Stop observing after animation
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
  );

  counters.forEach(counter => observer.observe(counter));
});

function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Close the menu if clicked outside
window.addEventListener("click", function(event) {
    const menu = document.getElementById("dropdown-menu");
    if (!event.target.closest(".menu-container")) {
        menu.style.display = "none";
    }
});
