var squares = document.querySelectorAll(".square");
var winningColor; // The RGB string that will be displayed at the top
var winningIndex = newWinningColor();
var messageDisplay = document.getElementById("resultmessage");
var winnerHeader = document.getElementById("winningcolor");
var resetButton = document.querySelector("#resetBtn");
var modeButtons = document.querySelectorAll(".modeBtns");
var hardMode = true;

init();

function init() {
	modeButtons[1].classList.add("selected");
	resetButton.addEventListener("click", reset);
	modeButtonSetup();
	reset();
	initializeSquareListeners();
}

// Randomly generate number from 0-2 or 0-5, depending on easy/hard mode. That number will decide which square is the winner.
function newWinningColor() {
	if (hardMode == true) {
		return Math.floor(Math.random() * 6);
	} else {
		return Math.floor(Math.random() * 3);
	}
}

// Add listeners to Easy/Hard buttons
function modeButtonSetup() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// set hardMode to true or false
			this.textContent === "EASY" ? hardMode = false : hardMode = true;
			changeModes();
			reset();
		});
	}
}

// Helper for modeButtonSetup()
// Enable/Reenable bottom 3 squares based on mode
function changeModes() {
	if (hardMode) {
		for (var i = 3; i < squares.length; i++) {
			squares[i].style.display = "block";
		}
	} else {
		for (var i = 3; i < squares.length; i++) {
			squares[i].style.display = "none";
		}
	}
}

// Resets the game
function reset() {
	winningIndex = newWinningColor();
	// Generate new colors and set each square
	for (var i = 0; i < squares.length; i++) {
		// Add color to each square
		var color = generateRandomColor();
		squares[i].style.backgroundColor = color;
		// The winning index was previously chosen by newWinningColor()
		// Sets winningColor equal to the color at this index
		if (i == winningIndex) {
			winningColor = color;
		}
	}
	// Change the header color and text back to previous values
	document.getElementById("header").style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	winnerHeader.textContent = winningColor; // Display RGB string in header
	resetButton.textContent = "NEW COLORS";
}

// Generates random RGB values from 0-255
function generateRandomColor() {
	var r,g,b; 
	do {
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
	} // Ensure that the square will not be same color as background
	while ( r === 33 && g === 33 && b === 33);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Add listeners to the squares
function initializeSquareListeners() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			if (this.style.backgroundColor === winningColor) {
				winner();
				resetButton.textContent = "PLAY AGAIN?";
			} else {
				this.style.backgroundColor = "#333333";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

// Changes the rest of the squares and header color when correct guess
function winner() {
	messageDisplay.textContent = "Correct!";
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = winningColor;
	}
	document.getElementById("header").style.backgroundColor = winningColor;
}
