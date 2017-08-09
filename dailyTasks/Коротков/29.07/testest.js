fs = require ("fs");

var i;
var u;
var number = 1;
var mas = [];

var text = fs.readFileSync ("./txts/text2.txt", "utf8");
for (i = 0; i < text.length; i++) {
	if (number === 6) {
		number = 1;
		mas.push (" ");
	}
	if (text[i] === " " || text[i] === "\n") {
		number++;
	}
	if (number === 5) {
		if (text[i] !== " " && text[i] !== "." && text[i] !== "\r" && text[i] !== "\n" && text[i] !== ",") {
			mas.push (text[i]);
		}
	}
}
var t = mas.join ("");
console.log (t);
fs.writeFileSync ("./txts/outputText.txt", t);