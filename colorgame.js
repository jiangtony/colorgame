var squares = document.querySelectorAll(".square");
var winningColor; // The RGB string that will be displayed at the top
var winningIndex = newWinningColor();
var messageDisplay = document.getElementById("resultmessage");
var winnerHeader = document.getElementById("winningcolor");
var resetButton = document.querySelector("#resetBtn");
var easyButton = document.querySelector("#easyBtn");
var hardButton = document.querySelector("#hardBtn");
var hardMode = true;

init();

function init() {
	hardButton.classList.add("selected");
	resetButton.addEventListener("click", reset);

	easyButton.addEventListener("click", function() {
		this.classList.add("selected");
		hardButton.classList.remove("selected");
		hardMode = false;
		// Hide bottom 3 squares
		for (var i = 3; i < squares.length; i++) {
			squares[i].style.display = "none";
		}
		reset();
	});

	hardButton.addEventListener("click", function() {
		this.classList.add("selected");
		easyButton.classList.remove("selected");
		hardMode = true;
		// Reenable bottom 3 squares
		for (var i = 3; i < squares.length; i++) {
			squares[i].style.display = "block";
		}
		reset();
	});


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

function reset() {
	winningIndex = newWinningColor();
	// Generate new colors and set each square
	for (var i = 0; i < squares.length; i++) {
		// Add color to each square
		var color = generateRandomColor();
		squares[i].style.backgroundColor = color;

		// Set the winning color
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

function generateRandomColor() {
	var r,g,b; 
	do {
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
	} 
	while ( r === 33 && g === 33 && b === 33); // Ensure that the square will not be same color as background
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

function winner() {
	messageDisplay.textContent = "Correct!";
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = winningColor;
	}
	document.getElementById("header").style.backgroundColor = winningColor;
}

