function changeText() {
	var text = document.getElementById("text");
	text.setAttribute("style", "color:red");
}

setTimeout(changeText, 500);