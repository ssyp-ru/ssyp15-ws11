var E = 0;
var O = 1;
var X = 2;
var NOBODY = 3;

function draw(level) {
	console.log(level[0]);
	console.log(level[1]);
	console.log(level[2]);
	
	console.log("\n");
}

function randooom() {
	var r = Math.random() * 10;
	
	if(r < 3.3) {
		return 0;
	} else if(r < 6.6) {
		return 1;
	} else {
		return 2;
	}
}

function AI(level, player) {
	while(1) {
		var x = randooom();
		var y = randooom();
		
		if(level[x][y] === E) {
			if(player === O) {
				level[x][y] = O;
			} else {
				level[x][y] = X;
			}
			
			break;
		} 
		
	}
}

function victory(level) {
	if((level[0][0] === O && level[0][1] === O && level[0][2] === O) ||
		(level[1][0] === O && level[1][1] === O && level[1][2] === O) ||
		(level[2][0] === O && level[2][1] === O && level[2][2] === O) ||
		(level[0][0] === O && level[1][0] === O && level[2][0] === O) ||
		(level[0][1] === O && level[1][1] === O && level[2][1] === O) ||
		(level[0][2] === O && level[1][2] === O && level[2][2] === O) ||
		(level[0][0] === O && level[1][1] === O && level[2][2] === O) ||
		(level[0][2] === O && level[1][1] === O && level[2][0] === O)) {
		return O;
	} else if((level[0][0] === X && level[0][1] === X && level[0][2] === X) ||
		(level[1][0] === X && level[1][1] === X && level[1][2] === X) ||
		(level[2][0] === X && level[2][1] === X && level[2][2] === X) ||
		(level[0][0] === X && level[1][0] === X && level[2][0] === X) ||
		(level[0][1] === X && level[1][1] === X && level[2][1] === X) ||
		(level[0][2] === X && level[1][2] === X && level[2][2] === X) ||
		(level[0][0] === X && level[1][1] === X && level[2][2] === X) ||
		(level[0][2] === X && level[1][1] === X && level[2][0] === X)) {
		return X;
	} else {
		var counter = 0;
	
		for(var i = 0; i < level.length; i++) {
			for(var j = 0; j < level.length; j++) {	
				if(level[i][j] === X ||
					level[i][j] === O) {
					counter++;
				}
			}
		}	
		
		if(counter === level.length * level.length) {
			return NOBODY;
		}
	}
}

function game() {
	var r1 = [0, 0, 0];
	var r2 = [0, 0, 0];
	var r3 = [0, 0, 0];

	var level = [r1, r2, r3];
	
	var player = 1;
	
	while(1) {
		if(player % 2 === 0) {
			AI(level, X);
		} else {
			AI(level, O);
		}
		
		draw(level);
		
		
		if(victory(level) === O) {
			console.log("O!");
			break;
		} else if(victory(level) === X) {
			console.log("X!");
			break;
		} else if(victory(level) === NOBODY) {
			console.log("NOBODY!");
			break;
		}
		
		player++;
	}
}

game();