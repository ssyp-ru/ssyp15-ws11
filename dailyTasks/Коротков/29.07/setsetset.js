fs = require ("fs");

var file = [];
var folder = [];
var path = "./txts/";

fs.readdir (path, function (err, files) {
	if (err) throw err;

	for (i = 0; i < files.length; i++) {
		if (files[i].indexOf(".") !== -1) {
			file.push (files[i]);
		} else {
			folder.push (files[i]);
		}
	}
	console.log ("Files:");
	console.log (file);
	console.log ("Folders:");
	console.log (folder);
});