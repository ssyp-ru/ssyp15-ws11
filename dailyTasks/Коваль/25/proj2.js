function random(i) {
	return Math.floor(Math.random() * i);
}

var nTown = function(town, viaTown, nRoads) {  
	this.town    = town;
	this.viaTown = viaTown;
	this.nRoads  = nRoads;
}

var Town = function(name, towns) {
	this.name   = name;
	this.roads  = [];
	this.nTowns = [];
	
	this.getNTowns_1 = function() {
		for(var i = 0; i < this.roads.length; i++) {
			var town;
			if(this === this.roads[i].startTown) {
				town = this.roads[i].endTown;
			} else {
				town = this.roads[i].startTown;
			}
			
			var ntown = new nTown(town, town, 1);
			this.nTowns.push(ntown);
		}
	}
	
	this.getNTowns_2 = function() {
		//debugger;
		for(var i = 0; i < this.nTowns.length; i++) {  
			for(var j = 0; j < this.nTowns[i].viaTown.nTowns.length; j++) {
				var counter = 0;
				for(var h = 0; h < this.nTowns.length; h++) {
					if(this.nTowns[j].viaTown.nTowns !== this.nTowns[h]) {
						counter++;
					}
				}
				
				if(this !== this.nTowns[i].viaTown.nTowns[j] || counter === this.nTowns.length - 1) {
					this.nTowns.push(this.nTowns[i].viaTown.nTowns[j]);
				}
			}
		}
	}
	
	
	
	towns.push(this);
}

var Road = function(startTown, endTown, length) {
	this.startTown  = startTown;
	startTown.roads.push(this);
	this.endTown    = endTown;
	endTown.roads.push(this);
	
	this.length = length;
	
	this.viewStats = function() {
		console.log(this.startTown, " - ", this.length, " - ", this.endTown);
	}
}

var Walker = function(startTown, speed) {
	this.startTown = startTown;
	this.speed     = speed;
	
	this.length    = 0;
	this.road      = 0;
	
	this.state     = "CHANGE_ROAD"; 
	/* IDLE, WALKING, CHANGE_ROAD, FINISHED */
	
	this.viewStats = function() {
		console.log("Start town: ", this.startTown);
		console.log("End town: ", this.endTown);
		console.log("Speed: ", this.speed);
		console.log("Length: ", this.length, " (", this.road.length - this.length, ")\n");
		console.log("Road: ", this.road);
	}
}

var Living = function(startTown, endTown, speed) {
	Walker.call(this, startTown, speed);
	this.endTown = endTown;
	
	this.checkEnd = function() {
		if(this.startTown === this.endTown) {
			state = "FINISHED";
			return 1;
		} else {
			return 0;
		}
	}
	
	this.walk = function() {
		
		if(this.state === "CHANGE_ROAD") {
			
			if(this.startTown.roads.length === 0) {
				return 0;
			}
			
			var nextTown;
		
			for(var i = 0; i < this.startTown.nTowns.length; i++) {
				if(this.startTown.nTowns[i].town === this.endTown) {
					nextTown = this.startTown.nTowns[i].viaTown;
				}
			}
			
			for(var j = 0; j < this.startTown.roads.length; j++) {
				for(var h = 0; h < nextTown.roads.length; h++) {
					if(this.startTown.roads[j] === nextTown.roads[h]) {
						this.road = nextTown.roads[h];
					}
				}
			}
		
			this.state = "WALKING";
		} else if(this.length >= this.road.length) { 
			this.state  = "CHANGE_ROAD";
			this.length = 0;
			
			if(this.startTown === this.road.startTown) {
				this.startTown = this.road.endTown;
			} else {
				this.startTown = this.road.startTown;
			}
		
		} else {
			this.length += this.speed;
		}
	}
}

var Dead = function(startTown, speed) {
	Walker.call(this, startTown, speed);
	
	this.walk = function() {
		if(this.state === "CHANGE_ROAD") {
			if(this.startTown.roads.length === 0) {
				return 0;
			}
			this.road  = this.startTown.roads[random(this.startTown.roads.length)];
			this.state = "WALKING";
		} else if(this.length >= this.road.length) { 
			this.state  = "CHANGE_ROAD";
			this.length = 0;
			
			if(this.startTown === this.road.startTown) {
				this.startTown = this.road.endTown;
			} else {
				this.startTown = this.road.startTown;
			}
		
		} else {
			this.length += this.speed;
		}
	}
	
	this.checkHit = function(living) {
		if(this.road === living.road) {
			var s;
			var v;
			if(this.startTown === living.startTown) {
				s = this.length - living.length;
			} else {
				s = this.length - (this.road.length - living.length);
			}
			
			if(this.speed > living.speed) {
				v = this.speed;
			} else {
				v = living.speed;
			}
			
			if(s > -v && s < v) {
				return true;
			}
		}
	} 
}
var towns = [];
/* 
var A = new Town("London", towns);
var B = new Town("Berlin", towns);
var C = new Town("Moscow", towns);
var D = new Town("Kiev", towns);
var F = new Town("Mumbai", towns);
var G = new Town("Astana", towns);

var road1 = new Road(A, B, 10);
var road2 = new Road(B, C, 8);
var road3 = new Road(C, D, 8);
var road4 = new Road(C, G, 11);
var road5 = new Road(G, F, 7);
var road6 = new Road(D, G, 13);

var gameOver = 0;
*/

var A = new Town("A", towns);
var B = new Town("B", towns);
var C = new Town("C", towns);
var D = new Town("D", towns);
var road1 = new Road(A, B, 10);
var road2 = new Road(A, C, 5);
var road3 = new Road(B, D, 7);

var walker = new Living(A, D, 1);

for(var i = 0; i < towns.length; i++) {
	console.log(towns[i].name);
	
	towns[i].getNTowns_1();
	towns[i].getNTowns_2();
	console.log(towns[i].nTowns);
}

/*while(true) {
	if(walker.checkEnd()) {
		console.log("\n\n\nFINISHED!\n\n\n");
		break;
	}
	
	walker.walk();
	
	walker.viewStats();
	console.log("\n\n\n");
}*/


