var fs = require("fs");
deepCopy = function(o) {
	var copy = o,k;

	if (o && typeof o === 'object') {
		copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
		for (k in o) {
			copy[k] = deepCopy(o[k]);
		}
	}
	return copy;
}
function getFiles(path)
{
	var arr = [];
	arr = fs.readdir(path, function(err, files){
		var array = [];
		if(err)
			throw err;
		for (var i = 0; i < files.length; i++)
		{
			console.log("Checking", files[i]);
			if(files[i].slice(files[i].length - 4, files[i].length) === ".txt")
			{
				array.push(deepcopy(files[i]));
				console.log	(arr);
				console.log("Added file", files[i]);
			}
			else
			{
				console.log("GO recursion******************************************", path+files[i]+"/");
				getFiles(path+files[i]+"/");
			}
		}
		return array;
	});
	console.log("ARRAY******************************************************************************************", arr);
	return arr;
	console.log("GO back from", path);
}
fs.writeFileSync("./tree.txt",getFiles("./forTree/").join(" "));