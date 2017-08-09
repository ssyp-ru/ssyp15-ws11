var i;
var x;
var y;
var kick;
var REDdeath = 0;
var BLUdeath = 0;

function REDrand (z) {
	var z = Math.round (Math.random () * (RED.length - 1));
	while (RED[z].isAlive === false) {
		var z = Math.round (Math.random () * (RED.length - 1));
	}
	return (z);
}

function BLUrand (z) {
	var z = Math.round (Math.random () * (BLU.length - 1));
	while (BLU[z].isAlive === false) {
		var z = Math.round (Math.random () * (BLU.length - 1));
	}
	return (z);
}

var RED = [];

console.log ("RED:");

for (var i = 0; i < Math.round (Math.random () * 5 + 5); i++) {
	RED[i] = {isAlive: true, HP: 100, power: Math.round (Math.random () * 10 + 25)};
	console.log ((i + 1) + " - " + RED[i].power);
}

var BLU = [];

console.log ("BLU:");

for (var i = 0; i < RED.length; i++) {
	BLU[i] = {isAlive: true, HP: 100, power: Math.round (Math.random () * 10 + 25)};
	console.log ((i + 1) + " - " + BLU[i].power);
}

while (REDdeath < RED.length && BLUdeath < BLU.length) {
	x = REDrand(0);
	while (!RED[x].isAlive) {
		x = REDrand(0);	
	}
	y = BLUrand(0);
	while (!BLU[y].isAlive) {
		y = BLUrand(0);	
	}

	if (Math.round (Math.random () * 99 + 1) < 51) {
		var dmg = BLU[y].power - 10 + Math.round (Math.random () * 20);
		RED[x].HP = RED[x].HP - dmg;
		console.log ("BLU fighter #" + (y + 1) + " deals " + dmg + " damage to RED fighter #" + (x + 1) + ".");
	} else {
		var dmg = RED[x].power - 10 + Math.round (Math.random () * 20);
		BLU[y].HP = BLU[y].HP - dmg;
		console.log ("RED fighter #" + (x + 1) + " deals " + dmg + " damage to BLU fighter #" + (y + 1) + ".");
	}

	for (kick = 0; kick < RED.length; kick++) {
		if (RED[kick].HP < 1 && RED[kick].isAlive) {
			RED[kick].isAlive = false;
			console.log ("RED fighter #" + (kick + 1) + " is dead.");
			REDdeath++;
		}
	}

	for (kick = 0; kick < BLU.length; kick++) {
		if (BLU[kick].HP < 1 && BLU[kick].isAlive) {
			BLU[kick].isAlive = false;
			console.log ("BLU fighter #" + (kick + 1) + " is dead.");
			BLUdeath++;
		}
	}
}

if (REDdeath === RED.length) {
	console.log ("BLU wins.");
}

if (BLUdeath === BLU.length) {
	console.log ("RED wins.");
}