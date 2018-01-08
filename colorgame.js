var squares = document.querySelectorAll(".square");

var winningColor; // The RGB string that will be displayed at the top

var winningIndex = newWinningColor();

var messageDisplay = document.getElementById("resultmessage");

var winnerHeader = document.getElementById("winningcolor");

var resetButton = document.querySelector("#resetBtn");
var easyButton = document.querySelector("#easyBtn");
var hardButton = document.querySelector("#hardBtn");

hardButton.classList.add("selected");

resetButton.addEventListener("click", reset);
easyButton.addEventListener("click", function() {
	this.classList.add("selected");
	hardButton.classList.remove("selected");

	// remove listeners from bottom 3 and hide them
	
});

hardButton.addEventListener("click", function() {
	this.classList.add("selected");
	easyButton.classList.remove("selected");

	//add listeners back to bottom 3
	
});


reset();

// Add listeners to the squares
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function() {
		if (this.style.backgroundColor === winningColor) {
			winner();
			resetButton.textContent = "PLAY AGAIN?";
		} else {
			//alert("Wrong");
			this.style.backgroundColor = "#333333";
			messageDisplay.textContent = "Try Again!";
		}
	});
}

// Generate number from 0-5. That number will decide which square is the winner.
function newWinningColor() {
	return Math.floor(Math.random() * 6);
}

function generateRandomColor() {
	var r,g,b; 
	do {
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
	} 
	while ( r == 33 && g == 33 && b == 33); // Ensure that the square will not be same color as background
	// or just put a border around each square?
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function winner() {
	messageDisplay.textContent = "Correct!";
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = winningColor;
	}
	document.getElementById("header").style.backgroundColor = winningColor;
}

function reset() {
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
	// Change the header color back
	document.getElementById("header").style.backgroundColor = "#333333";
	messageDisplay.textContent = "Pick a Color";

	winnerHeader.textContent = winningColor; // Display RGB string in header
	resetButton.textContent = "New Colors";

}