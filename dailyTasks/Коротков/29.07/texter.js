fs = require ("fs");

var i;
var path = './txts/';

fs.readdir (path, function (err, files) {
	if (err) throw err;

	var c = [];
	var w = [];
	var s = [];
	var l = [];

	for (i = 0; i < files.length; i++) {
		if (files[i].indexOf(".txt") !== -1) {
			var text = fs.readFileSync (path + files[i], 'utf8');
			console.log (text + "\n");

			var u = 0;
			var words = 1;
			var sentences = 0;
			var lines = 1;

			while (text[u] !== undefined) {
				if (text[u] === " " || text[u] === "\n") {
					words++;
				}

				if (text[u] === "\n") {
					lines++;
				}

				if (text[u] === ".") {
					sentences++;
				}
				u++;
			}

			c.push ([files[i] + "", text.length - lines + 1]);
			w.push ([files[i] + "", words]);
			s.push ([files[i] + "", sentences]);
			l.push ([files[i] + "", lines]);
		}
	}
	c.sort (function (x, y) {return -(x[1] - y[1])});
	console.log ("Characters:");
	console.log (c);
	w.sort (function (x, y) {return -(x[1] - y[1])});
	console.log ("Words:");
	console.log (w);
	s.sort (function (x, y) {return -(x[1] - y[1])});
	console.log ("Sentences:");
	console.log (s);
	l.sort (function (x, y) {return -(x[1] - y[1])});
	console.log ("Lines:");
	console.log (l);
});