// Set Kod's birthday (use the format "YYYY-MM-DD")
const birthday = new Date("2025-07-06T00:00:00");  // Update this to the correct year for the next birthday

// Update countdown every second
function updateCountdown() {
  const now = new Date();
  const timeRemaining = birthday - now;

  if (timeRemaining > 0) {
    const totalDays = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const totalMinutes = Math.floor(timeRemaining / (1000 * 60));
    const totalSeconds = Math.floor(timeRemaining / 1000);

    // Update the HTML elements with the countdown values
    document.getElementById("days-count").textContent = totalDays;
    document.getElementById("hours-count").textContent = totalHours;
    document.getElementById("minutes-count").textContent = totalMinutes;
    document.getElementById("seconds-count").textContent = totalSeconds;
  } else {
    document.querySelectorAll(".count").forEach(el => el.textContent = "0");
  }
}

// Scroll to the next section on scroll
let currentSectionIndex = 0; // Start from the first section
const sections = document.querySelectorAll(".countdown-section");
const totalSections = sections.length;

function handleScroll(event) {
  event.preventDefault(); // Prevent default scroll behavior
  const delta = event.deltaY;

  if (delta > 0 && currentSectionIndex < totalSections - 1) {
    currentSectionIndex++; // Scrolling down
  } else if (delta < 0 && currentSectionIndex > 0) {
    currentSectionIndex--; // Scrolling up
  }

  // Update visibility of sections
  updateSectionVisibility();
}

function updateSectionVisibility() {
  sections.forEach((section, index) => {
    if (index === currentSectionIndex) {
      section.classList.add("visible");
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      section.classList.remove("visible");
    }
  });
}

document.getElementById("share-button").addEventListener("click", shareCountdown);

function shareCountdown() {
    const shareText = "Check out this countdown to Kod's birthday!";
    const shareUrl = window.location.href; // Get the current page URL

    if (navigator.share) {
        // If the browser supports the Web Share API
        navigator.share({
            title: 'Kod\'s Birthday Countdown',
            text: shareText,
            url: shareUrl,
        })
        .then(() => console.log('Share successful!'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        // Fallback for browsers that do not support Web Share API
        alert("Your browser does not support sharing. Copy the link: " + shareUrl);
    }
}

// Initial visibility setup
updateSectionVisibility();

window.addEventListener("wheel", handleScroll);
setInterval(updateCountdown, 1000);
