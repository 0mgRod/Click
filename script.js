let clicks = 0;
let countdownInterval;

function displayLevels(level) {
  // Create level buttons in reverse order
  const parentElement = document.getElementById("level-select-list");
  parentElement.innerHTML = "";

  for (let i = level; i >= 1; i--) {
    // Create a new HTML element
    const newElement = document.createElement("button");

    // Set attributes or properties for the new element if needed
    newElement.textContent = i; // Example text content
    newElement.classList.add("level-select-button");

    // Add a click event listener to the button with a closure
    newElement.addEventListener("click",
    function() {
      playSelectSound();
      playLevel(i);
    });

    // Append the new element to the parent element
    parentElement.appendChild(newElement);
  }
}

function displayCash(cash) {
  document.getElementById("cash-text").innerText = "$" + cash
}

function defaultStats() {
  // Use a default value if "level" or "cash" is not set in localStorage
  const level = localStorage.getItem("omgrod/click/level") || 1;
  const cash = localStorage.getItem("omgrod/click/cash") || 0;

  // Set the default values in localStorage if they are missing
  if (!localStorage.getItem("omgrod/click/level")) {
    localStorage.setItem("omgrod/click/level", level);
  }
  if (!localStorage.getItem("omgrod/click/cash")) {
    localStorage.setItem("omgrod/click/cash", cash);
  }

  displayLevels(level);
  displayCash(cash);

  return {
    level,
    cash
  };
}

function clickedMenuPlay() {
  document.getElementById("main-menu").classList.remove("active");
  document.getElementById("level-select").classList.add("active");
  playSelectSound();
}

function clickedMenuSettings() {
  document.getElementById("settings").classList.add("active");
  playSelectSound();
}

function clickedMenuShop() {
  document.getElementById("shop").classList.add("active");
  playSelectSound();
}

function clickedMenuTutorial() {
    const settings = document.getElementById("settings");
    document.getElementById("main-menu").classList.remove("active");
    settings.classList.remove("active")
    document.getElementById("tutorial").classList.add("active");
    playSelectSound();
}

function clickedBackButton() {
  const levelSelect = document.getElementById("level-select");
  const settings = document.getElementById("settings");
  const shop = document.getElementById("shop");
  const tutorial = document.getElementById("tutorial");
  const mainMenu = document.getElementById("main-menu");

  if (levelSelect.classList.contains("active")) {
    levelSelect.classList.remove("active");
    mainMenu.classList.add("active");
  } else if (settings.classList.contains("active")) {
    settings.classList.remove("active");
    mainMenu.classList.add("active");
  } else if (shop.classList.contains("active")) {
    shop.classList.remove("active");
    mainMenu.classList.add("active");
  } else if (tutorial.classList.contains("active")) {
    tutorial.classList.remove("active");
    mainMenu.classList.add("active");
  }
  playSelectSound();
}

function playLevel(level) {
    const levelSelect = document.getElementById("level-select");
    const game = document.getElementById("game");
    const scoreToBeatLabel = document.getElementById("click-counter-beat");
    let scoreToBeat;

    scoreToBeat = (level * 10) + 15

    levelSelect.classList.remove("active");
    game.classList.add("active");
    scoreToBeatLabel.innerText = "Score to beat: " + scoreToBeat;

    // Start a 10-second countdown
    startCountdown(10, () => {
      // Check if clicks are greater than or equal to the score to beat
      if (clicks >= scoreToBeat) {
        // Increase the level in local storage
        const currentLevel = parseInt(localStorage.getItem("omgrod/click/level")) || 1;
        if (level + 1 > currentLevel) {
          localStorage.setItem("omgrod/click/level", currentLevel + 1);
        }
  
        // Display a message or perform other actions
      } else {
        console.log("User failed :(")
      }
      
      // Calculate cash reward (e.g., 1 cash per click)
      const cashReward = clicks;
      const currentCash = parseInt(localStorage.getItem("omgrod/click/cash")) || 0;
      localStorage.setItem("omgrod/click/cash", currentCash + cashReward);

      displayCash(localStorage.getItem("omgrod/click/cash"));

      // Reset clicks and go back to the level select screen
      clicks = 0;

      const clickCounter = document.getElementById("click-counter");
      clickCounter.innerText = "Clicks: " + 0;
  
      defaultStats();
  
      game.classList.remove("active");
      levelSelect.classList.add("active");
    });
  }  

function playSelectSound() {
  const audio = new Audio("assets/select.wav");
  audio.play();
}

function clickerClicked() {
  clicks += 1;
  const clickCounter = document.getElementById("click-counter");
  clickCounter.innerText = "Clicks: " + clicks;

  const clickerButton = document.querySelector("#game-clicker > img");
  
  // Change the image source to clicked state
  clickerButton.src = "assets/clickerClicked.png";

  // Wait for a short duration (e.g., 500 milliseconds) before changing it back to default
  setTimeout(function () {
    clickerButton.src = "assets/clicker.png";
  }, 100); // Adjust the time as needed for the desired animation speed
}

function startCountdown(seconds, callback) {
  let remainingSeconds = seconds;
  const countdownLabel = document.getElementById("countdown-label");

  countdownLabel.innerText = "Countdown: " + remainingSeconds + "s";

  countdownInterval = setInterval(function() {
    remainingSeconds -= 1;
    countdownLabel.innerText = "Countdown: " + remainingSeconds + "s";

    if (remainingSeconds <= 0) {
      clearInterval(countdownInterval);
      callback();
    }
  },
  1000);
}

defaultStats();