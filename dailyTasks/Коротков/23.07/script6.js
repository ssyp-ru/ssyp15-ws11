var i;
var first;
var second;
var kick;
var death = 0;

function rand (z) {
	var z = Math.round (Math.random () * (Mas.length - 1));
	while (Mas[z].isAlive === false) {
		var z = Math.round (Math.random () * (Mas.length - 1));
	}
	return (z);
}

var Mas = [];

for (var i = 0; i < Math.round (Math.random () * 5 + 5); i++) {
	Mas[i] = {isAlive: true, HP: 100, power: Math.round (Math.random () * 10 + 25)};
}

for (i = 0; i < Mas.length; i++) {
	console.log ((i + 1) + " - " + Mas[i].power);
}

console.log ("There are " + Mas.length + " fighters in the battle.")

while (death < Mas.length - 1) {
	first = rand(0);
	while (!Mas[first].isAlive) {
		first = rand(0);	
	}
	second = rand(0);
	while (!Mas[second].isAlive || second === first) {
		second = rand(0);	
	}

	if (Math.round (Math.random ()) < 0.5) {
		var dmg = Mas[second].power - 10 + Math.round (Math.random () * 20);
		Mas[first].HP = Mas[first].HP - dmg;
		console.log ("Fighter #" + (second + 1) + " deals " + dmg + " damage to fighter #" + (first + 1) + ".");
	} else {
		var dmg = Mas[first].power - 10 + Math.round (Math.random () * 20);
		Mas[second].HP = Mas[second].HP - dmg;
		console.log ("Fighter #" + (first + 1) + " deals " + dmg + " damage to fighter #" + (second + 1) + ".");
	}

	for (kick = 0; kick < Mas.length; kick++) {
		if (Mas[kick].HP < 1 && Mas[kick].isAlive) {
			Mas[kick].isAlive = false;
			console.log ("Fighter #" + (kick + 1) + " is dead.");
			death++;
		}
	}
}

var i = 0;
while (!Mas[i].isAlive) {
	i++;
}

console.log ("Fighter #" + (i + 1) + " wins.");