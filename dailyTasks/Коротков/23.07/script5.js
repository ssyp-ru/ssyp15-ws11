var i;
var x;
var y;

function rand (z) {
	var z = Math.round (Math.random () * (Mas.length - 1));
	while (Mas[z].isAlive === false) {
		var z = Math.round (Math.random () * (Mas.length - 1));
	}
	return (z);
}

var Mas = [];

for (var i = 0; i < Math.round (Math.random () * 5 + 5); i++) {
	Mas[i] = {isAlive: true};
}

console.log ("There are " + Mas.length + " fighters in the battle.")

for (var i = 0; i < (Mas.length - 1); i++) {
	x = rand(x);
	while (!Mas[x].isAlive) {
		x = rand(x);	
	}
	y = rand(y);
	while (!Mas[y].isAlive || y === x) {
		y = rand(y);	
	}
	if (Math.random () < 0.5) {
		Mas[x].isAlive = false;
		console.log ("Fighter #" + (y + 1) + " kills fighter #" + (x + 1) + ".");
	} else {
		Mas[y].isAlive = false;
		console.log ("Fighter #" + (x + 1) + " kills fighter #" + (y + 1) + ".");
	}
}
var i = 0;
while (!Mas[i].isAlive) {
	i++;
}
console.log ("Fighter #" + (i + 1) + " wins.");