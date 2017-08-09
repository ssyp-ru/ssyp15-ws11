fs = require("fs");

var word = 0, stroke = 0, pred = 0, simvol = 0;
function program(err, file){
	if(err) throw err;
	for(var j = 0;j<file.length;j++){
	var notepad = fs.readFileSync("./texts/" + file[j], 'utf8');
		for(var i = 0;i<notepad.length;i++){
			switch(notepad[i]){
				case "\n": stroke += 1;break;
				case ".": pred += 1;break;
				case " ": word += 1;break;
				default: if(notepad[i] !== '\n') simvol += 1;
			}
		}
	}
	console.log(stroke);
	console.log(pred);
	console.log(word);
	console.log(simvol);
}

fs.readdir('./texts/',program);

/*function text(){
	console.log("********");
	console.log(lenFile);
	console.log(files);
	for(var j = 0;j<lenFile;j++){
	var notepad = fs.readFileSync("./texts/" + files[j], 'utf8');
	console.log(files[j]);
	console.log("*********************");
		for(var i = 0;i<notepad.length;i++){
			switch(notepads[i]){
				case "\n": stroke += 1;break;
				case ".": pred += 1;break;
				case " ": word += 1;break;
				default: bykva += 1;
			}
		}
	}
}*/
//console.log(files);
//text();
//console.log(fs.readdir('./texts/',error));
//console.log(files);