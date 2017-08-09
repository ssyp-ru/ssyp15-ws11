var fs = require("fs");
function countWords(file)
{
	var count = 1;
	for(var i = 0; i < file.length; i++)
	{
		if(file[i] === " ")
			count++;
	}
	return count;
}
function countSentences(file)
{
	var count = 0;
	for(var i = 0; i < file.length; i++)
	{
		if((file[i] === ".")||(file[i] === "!")||(file[i] === "?"))
			count++;
	}
	return count;
}
function countLetters(file)
{
	var count = 0;
	for(var i = 0; i < file.length; i++)
	{
		if(file[i] !== "\n")
			count++;
	}
	return count;
}
function countStrings(file)
{
	var count = 1;
	for(var i = 0; i < file.length; i++)
	{
		if(file[i] === "\n")
			count++;
	}
	return count;
}

var func = function(err, files){
	if(err)
		throw err;
	//console.log(files);
	for(var i = 0; i < files.length; i++)
	{
		//console.log(files[i]);
		//console.log(files[i].slice(0, files[i].length - 4));
		if(files[i].slice(files[i].length - 4, files[i].length) === ".txt")
		{
			var file = fs.readFileSync(files[i], "utf8");
			console.log(file);
			console.log("File "+ files[i] + " |" + " Words - " + countWords(file) + " |" + " Sentences - " + countSentences(file) + " |" + " Letters - " + countLetters(file) + " |" + " Strings - " + countStrings(file));
		}
	}
}
fs.readdir("./", func);