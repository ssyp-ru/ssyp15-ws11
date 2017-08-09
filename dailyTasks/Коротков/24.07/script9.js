var money = 100;
var step = 0;
var i;
var u = 0;

var Str = [];

chm = function () {
	Str.push(new Chemists (100, 30, 6, 20));
	return money - 100;
}
twn = function () {
	Str.push(new Townhouse (200, 50, 30, 100));
	return money - 150;
}
htl = function () {
	Str.push(new Hotel (3000, 100, 10, 70));
	return money - 3000;
}

pnt = function () {
	Str.push(new Paintball (50000, 130, 60, 600));
	return money - 50000;
}

mrk = function () {
	Str.push(new Marketplace (250000, 200, 1, 50));
	return money - 250000;
}

var Building = function (price, daysToBuild, period, income) {
	this.price = price;
	this.daysRemaining = daysToBuild;
	this.period = period;
	this.income = income;
	this.timer = period;
	this.check = function() {
		if(this.daysRemaining > 0) {
			this.daysRemaining--;
			return;
		} else {
			if(this.timer > 0) {
				this.timer--;
			} else {
				this.timer = this.period;
				money += this.income;
			}
		}
	}
}

var Chemists = function (price, daysToBuild, period, income) {
	Building.call (this, price, daysToBuild, period, income);
}

Chemists.prototype = new Building();

var Townhouse = function (price, daysToBuild, period, income) {
	Building.call (this, price, daysToBuild, period, income);
}

Townhouse.prototype = new Building();

var Hotel = function (price, daysToBuild, period, income) {
	Building.call (this, price, daysToBuild, period, income);
}

Hotel.prototype = new Building();

var Paintball = function (price, daysToBuild, period, income) {
	Building.call (this, price, daysToBuild, period, income);
}

Paintball.prototype = new Building();

var Marketplace = function (price, daysToBuild, period, income) {
	Building.call (this, price, daysToBuild, period, income);
}

Marketplace.prototype = new Building();

do {
	if (money >= 100) {
		var money = chm();	
	}

	for (i = 0; i < Str.length; i++) {
		Str[i].check();
	}
	step++;
} while (money < 1000000);

console.log (step);