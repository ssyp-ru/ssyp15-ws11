var i, j, curTown,curTownIndex, curTownName;

var roads = [];
var towns = [];

var road = function(length, townA, townB) {
	this.length = length;
	this.townA = townA;
	this.townB = townB;
};

var town = function(name) {
	this.name = name;
	this.roads = [];
	this.nTowns = [];	//{targetTown, viaTown, nRoads}
};

towns[0] = new town("London");
towns[1] = new town("Berlin");
towns[2] = new town("Moscow");
towns[3] = new town("Kiev");
towns[4] = new town("Astana");
towns[5] = new town("Mumbai");

roads[0] = new road (10, towns[0], towns[1]);
roads[1] = new road (8, towns[1], towns[2]);
roads[2] = new road (8, towns[2], towns[3]);
roads[3] = new road (11, towns[2], towns[4]);
roads[4] = new road (13, towns[3], towns[4]);
roads[5] = new road (7, towns[4], towns[5]);

function secondTown(town, road) {
	if(road.townA === town)
		return road.townB;
	return road.townA;
};

for(i=0; i< towns.length; i++){
	for(j=0; j<roads.length; j++) {
		if(roads[j].townA === towns[i] || roads[j].townB === towns[i]) {
			towns[i].roads.push(roads[j]);
		};
	};
};

for(i=0; i<towns.length; i++) {
	for(j=0; j<towns[i].roads.length; j++) {
		var neigTown = secondTown(towns[i], towns[i].roads[j]);
		towns[i].nTowns.push(
			{neigTown, neigTown, 1}
		);
	};
}; 

 /* var player = function(name, start, end, speed) {	
	this.name = name;
	this.start = start;
	this.end = end;
	this.speed = speed;
	
	this.curTown = this.start;
	this.curTownIndex = this.start.index;
	this.curTownName = this.start.name;

	
	this.getRoadLengthOnStart = function() {
		return(roads[(this.curTown.roads.sort()[0])-1].length);
	};
	
	this.getRoadOnStart = function() {
		return(roads[(this.curTown.roads.sort()[0])-1]);
	};
	
	this.go1 = function() {
		console.log(this.name + " is walking from " + this.curTownName + " to " + this.getRoadOnStart().finishtown);
		for (i = 0; i < ((this.getRoadLengthOnStart() / this.speed)*60); i++) {
			 console.log(this.name + " is walking for " + (i + 1) + " minutes");
		};
		
		this.curTown = this.getRoadOnStart().townB;
		this.curTownName = this.getRoadOnStart().townB.name;
		this.console.log(this.name + " arrived to " + this.curTownName + ".");
		
		return(this.name + " is on road " + this.start.roads.sort()[0]);
	
	};
}; */

// var walker = new player("Walker", towns[1], towns[5], 4);
	// walker.go1();
// var dead = new player("Dead", towns[5], towns[0], 2);
	// dead.go1();