var squares = document.querySelectorAll(".square");

var winningColor; // The RGB string that will be displayed at the top

var winningIndex = newWinningColor();

// Generate number from 0-5. That number will decide which square is the winner.
function newWinningColor() {
	return Math.floor(Math.random() * 6);
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

for (var i = 0; i < squares.length; i++) {
	// Add color to each square
	var color = randomColor();
	squares[i].style.backgroundColor = color;

	// Set the winning color
	if (i == winningIndex) {
		winningColor = color;
	}

	// Add listeners to the square
	squares[i].addEventListener("click", function() {
		if (this.style.backgroundColor === winningColor) {
			//alert("Correct");
		} else {
			//alert("Wrong");
			this.style.backgroundColor = "#333333";
		}
	});
}

var winnerHeader = document.getElementById("winningcolor");
winnerHeader.textContent = winningColor;