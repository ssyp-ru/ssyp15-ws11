var fs = require("fs");
var path = "./source/";

function findAndCount(file, c) {
	var counter = 0;
	if(c === " " || c === "\n") {
		counter++;
	}

	for(var i = 0; i < file.length; i++) {
		if(c === "*" && file[i] !== '\n') {
			counter++;
			continue;
		}

		if(file[i] === c) {
			if(!((c === '.' || c === ' ' || c === '\n') && i !== 0 && file[i-1] === c)) {
				counter++;
			}
		}
	}

	return counter;
}

function fileFilter(x) {
	if(x === "666") {
		return false;
	} else {
		return true;
	}
}

function fileSort(err, files) {
	if (err) {
		throw err;
	}

	for(var a = 0; a < files.length; a++) {
		if(files[a].indexOf(".txt") === -1) {
			files[a] = "666";
		}
	}

	files = files.filter(fileFilter);
	if(files.length < 2) {
		return 0;
	}

	for(var j = 0; j < files.length; j++) {
		files[j] = fs.readFileSync(path + files[j], 'utf8');
	}

	var counter = 0;

	while (true) {
		for (var i = 0; i < files.length - 1; i++) {
			var counter_1;
			var counter_2;

			for(var h = 0; h < 4; h++) {
				var c;

				switch(h) {
					case 0:
						c = " ";
						break;
					case 1:
						c = ".";
						break;
					case 2:
						c = "*";
						break;
					case 3:
						c = "\n";
						break;
				}

				counter_1 = findAndCount(files[i], c);
				counter_2 = findAndCount(files[i+1], c);

				if(counter_1 !== counter_2) {
					break;
				}

			}

			if (counter_1 < counter_2) {
				var file   = files[i];
				files[i]   = files[i + 1];
				files[i+1] = file;
			} else {
				counter++;
			}
		}

		if (counter === files.length - 2) {
			break;
		}
	}

	console.log(files);
}

function rewriting(file, counter) {
	var newFile = "";
	var spaceCounter = 1;

	for(var i = 0; i < file.length; i++) {
		if(file[i] === " ") {
			var j = i + 1;
			spaceCounter++;

			if(spaceCounter % counter === 0) {
				while(true) {
					newFile += file[j];

					if(j === file.length - 1) {
						break;
					} else {
						if(file[j+1] === " " || file[j+1] === "." || file[j+1] === "\n") {
							break;
						}
					}

					j++;
				}

				newFile += " ";
			}
		}
	}

	return newFile;
}
/*************************************/

fs.readdir(path, fileSort);
