var str = null;

function written(){
	str = prompt("What is your name?");
	var e = document.getElementById("e");
	e.innerHTML = "Hello, " + str;
	e = document.getElementsByName("p");
}

function end(){
	if(str === null)
		setInterval(written, 1);
	else
		alert("Good");
}

end();