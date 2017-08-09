var c = prompt("Name of the hero");

var A = [" looks into the code of the game.", " cries because of bugs in the code.", " wakes the Ultimate Kraken. What a piece of idiot...", " tries to forget an annoying pop song. 'It is impossible!' he says.", " makes you happy because of his stupidity :)."];
function tell () {
	console.log(c + A[Math.floor(Math.random() * 5)]);
}
setInterval (tell, 5000);