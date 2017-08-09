/*первая задача безвозвратно утрачена*/

function foo() {
	return 0;
}
var array = [1, 2, "brr", foo];
var s = "";

for(var i in array) {
	if(typeof array[i] === "number") {
		array[i] = array[i] * array[i];
	} else if(typeof array[i] === "string") {
		for(var u = array[i].length - 1; u >= 0; u--) {
			s += array[i][u];
		}
		 
		array[i] = "";
		
		for(var f = 0; f < s.length; f++) {
			array[i] += s[f];
		}
	} else if(typeof array[i] === "function") {
		array[i] = array[i]();
	}
}

for(var f in array) {
		console.log(array[f]);
}