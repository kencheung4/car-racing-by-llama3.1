// Get the canvas element and its context
const canvas = document.getElementById('car-canvas');
const ctx = canvas.getContext('2d');

// Set the game container element
const gameContainer = document.getElementById('game-container');

// Initialize game variables
let carX = 0;
let carSpeed = 0;
let startTime = 0;
let bestTime = Infinity;
let isGameStarted = false;


// Get the start button and timer elements
const startButton = document.getElementById('start-button');
const timerElement = document.getElementById('timer');

// Add event listener to start button
startButton.addEventListener('click', () => {
    if (!isGameStarted) {
        startGame();
    } else {
        stopGame();
    }
});

function startGame(){
     // Start game logic here
     carX = 0;
     carSpeed = 0;
     startTime = Date.now();
     isGameStarted = true;
     startButton.textContent = 'Stop Game';
     timerElement.textContent = '';
}

function stopGame(){
    // Stop game logic here
    carX = 0;
    carSpeed = 0;
    isGameStarted = false;
    startButton.textContent = 'Start Game';
    timerElement.textContent = '';
}

// Add event listener to key press events
document.addEventListener('keydown', (event) => {
    if (isGameStarted && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        // Increase or decrease car speed when left or right arrow is pressed
        if (event.key === 'ArrowLeft') {
            carSpeed += 2;
        } else {
            carSpeed -= 2;
            // Ensure car speed doesn't go below zero
            if (carSpeed < 0) {
                carSpeed = 0;
            }
        }
    }
});

// Game loop logic here
function updateGame() {
    const currentTime = Date.now();
    
    // Only update timer text content and game logic if game is started
    if (isGameStarted) {
        const elapsedTime = getFormattedTime(currentTime - startTime);
        
        // Update timer text content
        timerElement.textContent = `Time: ${elapsedTime} seconds`;
        
        // Update car position based on speed
        carX += carSpeed;
        
        if (carX > canvas.width) {
            const gameOverTime = currentTime - startTime;
            
            // Record best time if current game is faster than previous best time
            bestTime = Math.min(bestTime, gameOverTime);
            
            // Show confirmation dialog
            confirm(`Game Over! Your time was: ${getFormattedTime(gameOverTime)} seconds. Best Time: ${getFormattedTime(bestTime)} seconds`);
        
            stopGame();
        }
    } else {
        // Update best time if game isn't started
        if (bestTime == Infinity) {
            timerElement.textContent = '';
        } else {
            timerElement.textContent = `Best Time: ${getFormattedTime(bestTime)} seconds`;
        }
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw car on canvas
    drawCar(carX);
    
    // Call game loop again after delay
    requestAnimationFrame(updateGame);
}

// Function to format time in seconds
function getFormattedTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor(time / 1000);
    return `${seconds}.${Math.round(milliseconds / 10)}`;
}

// Function to draw car on canvas
function drawCar(x) {
    const car = new Image();
    car.src = 'car.webp'; // Load your own car image here
    
    ctx.drawImage(car, x, canvas.height / 2 - 50, 100, 100);
}

// Start game loop
updateGame();