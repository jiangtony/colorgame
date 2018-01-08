var game = {};

game.hardMode = true;

// Randomly generate number from 0-2 or 0-5, depending on easy/hard mode. That number will decide which square is the winner.
game.newWinningColor = function() {
	if (game.hardMode == true) {
		return Math.floor(Math.random() * 6);
	} else {
		return Math.floor(Math.random() * 3);
	}
}

game.squares = document.querySelectorAll(".square");
game.winningColor; // The RGB string that will be displayed at the top
game.winningIndex = game.newWinningColor();
game.messageDisplay = document.getElementById("resultmessage");
game.winnerHeader = document.getElementById("winningcolor");
game.resetButton = document.querySelector("#resetBtn");
game.modeButtons = document.querySelectorAll(".modeBtns");

game.init = function() {
	game.modeButtons[1].classList.add("selected");
	game.resetButton.addEventListener("click", game.reset);
	game.modeButtonSetup();
	game.reset();
	game.initializeSquareListeners();
}

// Add listeners to Easy/Hard buttons
game.modeButtonSetup = function() {
	for (var i = 0; i < game.modeButtons.length; i++) {
		game.modeButtons[i].addEventListener("click", function() {
			game.modeButtons[0].classList.remove("selected");
			game.modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// set hardMode to true or false
			this.textContent === "EASY" ? game.hardMode = false : game.hardMode = true;
			game.changeModes();
			game.reset();
		});
	}
}

// Helper for game.modeButtonSetup
// Enable/Reenable bottom 3 squares based on mode
game.changeModes = function() {
	if (game.hardMode) {
		for (var i = 3; i < game.squares.length; i++) {
			game.squares[i].style.display = "block";
		}
	} else {
		for (var i = 3; i < game.squares.length; i++) {
			game.squares[i].style.display = "none";
		}
	}
}

// Resets the game
game.reset = function() {
	game.winningIndex = game.newWinningColor();
	// Generate new colors and set each square
	for (var i = 0; i < game.squares.length; i++) {
		// Add color to each square
		var color = game.generateRandomColor();
		game.squares[i].style.backgroundColor = color;
		// The winning index was previously chosen by newWinningColor()
		// Sets winningColor equal to the color at this index
		if (i == game.winningIndex) {
			game.winningColor = color;
		}
	}
	// Change the header color and text back to previous values
	document.getElementById("header").style.backgroundColor = "steelblue";
	game.messageDisplay.textContent = "";
	game.winnerHeader.textContent = game.winningColor; // Display RGB string in header
	game.resetButton.textContent = "NEW COLORS";
}

// Generates random RGB values from 0-255
game.generateRandomColor = function() {
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
game.initializeSquareListeners = function() {
	for (var i = 0; i < game.squares.length; i++) {
		game.squares[i].addEventListener("click", function() {
			if (this.style.backgroundColor === game.winningColor) {
				game.winner();
				game.resetButton.textContent = "PLAY AGAIN?";
			} else {
				this.style.backgroundColor = "#333333";
				game.messageDisplay.textContent = "Try Again";
			}
		});
	}
}

// Changes the rest of the squares and header color when correct guess
game.winner = function() {
	game.messageDisplay.textContent = "Correct!";
	for (var i = 0; i < game.squares.length; i++) {
		game.squares[i].style.backgroundColor = game.winningColor;
	}
	document.getElementById("header").style.backgroundColor = game.winningColor;
}

game.init();