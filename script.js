// Base 4 colors
const baseColors = ["red", "blue", "yellow", "green"];

// Extra colors pool to add per level
const extraColors = [
  "purple", "orange", "pink", "brown", "cyan", "magenta", 
  "lime", "teal", "navy", "maroon", "olive", "coral", 
  "gold", "silver", "indigo", "violet", "beige", "lavender",
  "turquoise", "salmon", "mint", "chocolate", "tan", "crimson"
]; // enough colors for 20 levels (2 colors per level)

// HTML Elements
const colorBox = document.getElementById("colorBox");
const startButton = document.getElementById("startButton");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const worldRecordDisplay = document.getElementById("worldRecord");
const buttonsContainer = document.getElementById("buttons");

let currentColor;
let score = 0;
let level = 1;
let countdown;
let timeLeft = 2;
let gameActive = false;
let worldRecord = 0;

// Start Game
function startGame() {
  score = 0;
  level = 1;
  scoreDisplay.textContent = "Score: " + score;
  levelDisplay.textContent = "Level: " + level;
  startButton.style.display = "none";
  gameActive = true;
  updateButtons();
  nextColor();
}

// Get colors based on current level
function getColorsByLevel(level) {
  const newColorsCount = (level - 1) * 2;
  return baseColors.concat(extraColors.slice(0, newColorsCount));
}

// Update buttons based on current level
function updateButtons() {
  const colors = getColorsByLevel(level);
  buttonsContainer.innerHTML = "";
  colors.forEach(color => {
    const btn = document.createElement("button");
    btn.classList.add("colorButton");
    btn.id = color;
    btn.style.backgroundColor = color;
    btn.style.width = "80px";
    btn.style.height = "80px";
    btn.style.border = "none";
    btn.style.borderRadius = "15px";
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => handleClick(color));
    buttonsContainer.appendChild(btn);
  });
}

// Handle button click
function handleClick(clickedColor) {
  if (!gameActive) return;

  if (clickedColor === currentColor) {
    score++;
    scoreDisplay.textContent = "Score: " + score;

    // Level up every 10 points
    const newLevel = Math.floor(score / 10) + 1;
    if (newLevel !== level) {
      level = newLevel;
      levelDisplay.textContent = "Level: " + level;
      updateButtons(); // add more colors
    }

    // Update local world record
    if (score > worldRecord) {
      worldRecord = score;
      worldRecordDisplay.textContent = "World Record: " + worldRecord;
    }

    nextColor();
  } else {
    gameOver();
  }
}

// Next color
function nextColor() {
  if (!gameActive) return;
  const colors = getColorsByLevel(level);
  currentColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = currentColor;

  // Timer always 2 seconds
  timeLeft = 2;
  timerDisplay.textContent = timeLeft.toFixed(1);
  clearInterval(countdown);
  countdown = setInterval(() => {
    timeLeft -= 0.1;
    timerDisplay.textContent = timeLeft.toFixed(1);
    if (timeLeft <= 0) {
      clearInterval(countdown);
      gameOver();
    }
  }, 100);
}

// Game over
function gameOver() {
  alert("Game Over! Your score: " + score);
  startButton.style.display = "block";
  colorBox.style.backgroundColor = "";
  timerDisplay.textContent = "2";
  gameActive = false;
  clearInterval(countdown);
}

startButton.addEventListener("click", startGame);