var City = function (name) {
	this.name = name;
	this.roads = [];
	this.nCities = [];

	this.getRoads = function () {
		for (i = 0; i < Roads.length; i++) {
			if (Roads[i].city1 === this || Roads[i].city2 === this) {
				this.roads.push (Roads[i]);
			}
		}
	}

	this.getNearby = function () {
		for (i = 0; i < this.roads.length; i++) {
			if (this.roads[i].city1 === this) {
				this.nCities.push ({targetCity: this.roads[i].city2, viaCity: this.roads[i].city2, nRoads: 1});
			} else {
				this.nCities.push ({targetCity: this.roads[i].city1, viaCity: this.roads[i].city1, nRoads: 1});
			}
		}
	}

	this.getOthersNearby = function () {
		for (i = 0; i < this.nCities.length; i++) {
			var sos = this.nCities[i].targetCity;
			sos.nCities.push ({targetCity: sos.nCities[0].targetCity, viaCity: sos, nRoads: sos.nCities[0].nRoads + 1});
		}
	}
};

var london = new City ("London");
var paris = new City ("Paris");
var moscow = new City ("Moscow");
var berlin = new City ("Berlin");
var warsaw = new City ("Warsaw");

var Cities = [london, paris, moscow, berlin, warsaw];

var Road = function (city1, city2, length, bonus) {
	this.city1 = city1;
	this.city2 = city2;
	this.length = length;
	this.bonus = bonus;
}

//Roads:
var moscowparis = new Road (moscow, paris, 11, 1);
var londonparis = new Road (london, paris, 7, 0.75);
var warsawberlin = new Road (warsaw, berlin, 5, 1.2);
var moscowwarsaw = new Road (moscow, warsaw, 21, 0.9);
var warsawparis = new Road (warsaw, paris, 13, 1.5);
var londonberlin = new Road (london, berlin, 9, 0.8);

var Roads = [moscowparis, londonparis, warsawberlin, moscowwarsaw, warsawparis, londonberlin];

var Walker = function (name, surname, speed) {
	this.name = name;
	this.surname = surname;
	this.speed = speed;
	this.previousRoad = undefined;
	this.location = Cities[Math.round (Math.random () * (Cities.length - 1))];
	this.mainTarget = Math.round (Math.random () * (Cities.length - 1));
	this.target = undefined;
	this.targetname = undefined;
	this.kmRemaining = undefined;
	this.roads = [];
	this.randstreet = undefined;
	this.choose = function () {
		if (this.target === undefined) {
			for (i = 0; i < Roads.length; i++) {
				if (Roads[i].city1 === this.location || Roads[i].city2 === this.location) {
					this.roads.push (Roads[i]);
				}
			}
			for (i = 0; i < this.roads.length; i++) {
				if (this.roads[i] === this.previousRoad) {
					var x = this.roads.splice(i, 1);
					break;
				}
			}
			if (this.roads[0] === undefined) {
				this.randstreet = x[0];
			} else {
				this.randstreet = this.roads[Math.round (Math.random () * (this.roads.length - 1))];
			}
			this.previousRoad = this.randstreet;
			this.roads.splice (0);
			if (this.randstreet.city1 === this.location) {
				this.target = this.randstreet.city2;
				this.targetname = this.randstreet.city2.name;
				this.location =  this.randstreet.city1.name + " to " + this.randstreet.city2.name + " road.";
			} else {
				this.target = this.randstreet.city1;
				this.targetname = this.randstreet.city1.name;
				this.location =  this.randstreet.city2.name + " to " + this.randstreet.city1.name + " road.";
			}
			this.kmRemaining = this.randstreet.length;
		}
	}
	this.walk = function () {
		this.kmRemaining -= this.speed * this.randstreet.bonus;
		if (this.kmRemaining <= 0) {
			console.log (this.name + " " + this.surname + " is in " + this.targetname + " now.");
			this.location = this.target;
			this.target = undefined;
			this.randstreet = undefined;
			this.kmRemaining = undefined;
		}
	}
}

//Walkers:
var nathan = new Walker ("Nathan", "Twins", 4);
var hitler = new Walker ("Adolf", "Hitler", 3);
var mikhail = new Walker ("Mikhail", "Vitalyevich", 6);

var Walkers = [nathan, hitler, mikhail];

/*IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII*/

var hours = 0;
var i;
var u;
var j;

for (u = 0; u < Cities.length; u++) {
	Cities[u].getRoads();
}

for (u = 0; u < Cities.length; u++) {
	Cities[u].getNearby();
}

london.getOthersNearby();

setInterval(function () {
	for (j = 0; j < Walkers.length; j++) {
		Walkers[j].choose();
		Walkers[j].walk();
	}
	hours++;
}, 3000);