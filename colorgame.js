var squares = document.querySelectorAll(".square");

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}

for (var i = 0; i < squares.length; i++) {
	squares[i].style.backgroundColor = randomColor();
}