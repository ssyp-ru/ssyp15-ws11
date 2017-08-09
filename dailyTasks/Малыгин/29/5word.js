fs = require("fs");

function program(){
	var notepad = fs.readFileSync("./texts/5word.txt", 'utf8'), words = [], word = "";
	notepad[notepad.length] = " ";
	for(var i = 0;i<notepad.length;i++){
		if((notepad[i] === " ") || (notepad[i] === "\r") || (notepad[i] === "\n")){
			words.push(word);
			word = "";
		}
		else{
			word += notepad[i];
		}
	}
	words.push(word);
	/*for(var i = 0;i<words.length;i++){
		if(words[i] === "")
			words.splice(i,i+1);
	}*/
	console.log(words);
}

program();