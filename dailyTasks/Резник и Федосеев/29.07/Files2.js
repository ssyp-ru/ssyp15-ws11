var fs = require("fs");
function fifthWords(file)
{
	var data = [];
	var f = false;
	var count = 1, i = 0;
	while(i < file.length)
	{
		//console.log(flag);
		if(count % 5 === 0)
		{	console.log(count);
			f = true;
			//console.log(f);
			//console.log("*"+file[i]+"*");
		}
		if(f)
		{
			//console.log("PUSH"+file[i]);
			data.push(file[i]);
		}
		if(file[i] === " ")
		{
			count++;
			f = false;
		}
		i++;
	}
	console.log(data);
	return data;
}
var file1 = fs.readFileSync("./file1.txt", "utf8");
console.log(file1);
fs.writeFileSync("./file2.txt", fifthWords(file1).join(""));