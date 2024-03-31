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

  displayLevels(level, cash);

  return {level, cash};
}

const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ];
  
  let konamiCodePosition = 0;
  
  document.addEventListener('keydown', function (event) {
    const key = event.key;
  
    if (key === konamiCode[konamiCodePosition]) {
      konamiCodePosition++;
  
      if (konamiCodePosition === konamiCode.length) {
        // Konami code was successfully entered
        localStorage.setItem("omgrod/click/cash", 0)
        localStorage.setItem("omgrod/click/level", 1)
        const levelSelectList = document.getElementById("level-select-list");
        levelSelectList.innerHTML = "";
        defaultStats();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0; // Reset the position if the entered key is incorrect
    }
  });
  