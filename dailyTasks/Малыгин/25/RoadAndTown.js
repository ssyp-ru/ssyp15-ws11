var deadMass = [], roadMass = [], townMass = [], sos;

function Adventures(name, start, end, speed){
	this.name = name;
	this.start = start;
	this.end = end;
	this.speed = speed;
	this.distance = 0;
}

function Road(name, length, townA, townB){
	this.name = name;
	this.length = length;
	this.townA = townA;
	this.townB = townB;
}

function Town(name, number){
	this.name = name;
	this.number = number;
}

Town.prototype.getRoad = function(){
	this.roads = [];
	for(var i = 0;i<roadMass.length-1;i++){
		if((this.number === roadMass[i].townA) || this.number === roadMass[i].townB){
			this.roads.push(roadMass[i]);
		}
	}
}

Town.prototype.getTown = function(){
	this.nTowns = [];
	for(var j = 0;j<townMass.length;j++){
		for(var i = 0;i<this.roads.length;i++){
			if((this.roads[i].townA === townMass[j].number) ||
				(this.roads[i].townB === townMass[j].number)){
				this.nTowns.push(townMass[i].number);
			}
		}
	}
}

/*Town.prototype.getSos = function(){
	this.
}*/

townMass[0] = new Town("London", 1);
townMass[1] = new Town("Berlin", 2);
townMass[2] = new Town("Paris", 3);
townMass[3] = new Town("Sochi", 4);
townMass[4] = new Town("Kiev", 5);
var Walker = new Adventures("Walker", townMass[0].number, townMass[4].number, 5);
deadMass[0] = new Adventures("Dead1", townMass[4].number, townMass[0].number, 5);
//var Walker = new Adventures("Walker", 2, 3, 5);
//deadMass[0] = new Adventures("Dead1", 3, 1, 5);
/*roadMass[0] = new Road("Road1", 10, 1, 2);
roadMass[1] = new Road("Road2", 20, 2, 3);
roadMass[2] = new Road("Road2", 30, 3, 4);
roadMass[3] = new Road("Road2", 40, 4, 5);*/
roadMass[0] = new Road("Road1", 10, townMass[0].number, townMass[1].number);
roadMass[1] = new Road("Road2", 20, townMass[1].number, townMass[2].number);
roadMass[2] = new Road("Road2", 30, townMass[2].number, townMass[3].number);
roadMass[3] = new Road("Road2", 40, townMass[3].number, townMass[4].number);

function distance(){
	for(var i = Walker.start;i<Walker.end-1;i++){
		Walker.distance += roadMass[i].length;
	}
	deadMass[0].distance = roadMass[deadMass[0].end-1].length;
	for(var i = deadMass[0].end;i<deadMass[0].start-1;i++){
		deadMass[0].distance += roadMass[i].length;
	}
	var b = Walker.distance;
	Walker.distance -= deadMass[0].distance;
	Walker.distance = b - Walker.distance;
}

function event(){
	var vstrecha;
	vstrecha = Walker.speed * Walker.distance / (Walker.speed + deadMass[0].speed);
	console.log(vstrecha);
}

distance();

event();