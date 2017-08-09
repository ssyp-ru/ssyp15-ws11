var money  = 100;

/* STRUCTS */
var Building = function(price, dib, period, income) {
	this.price    = price; 
	this.period_c = period; 
	this.income   = income;
	
	this.period = period;
	this.daysInBuild = dib;
	
	Building.work = function() {
		if(this.daysInBuild > 0) {
			this.daysInBuild--;
		} else {
			if(this.period <= 1) {
				money += this.income;
				this.period = this.period_c;
			} else {
				this.period--;
			}
		}
	}

	Building.buy = function(buildings) {
		buildings.push(this);
		money -= this.price;
		console.log("SOLD! (", this.price, ")\n");
	}	

	Building.viewStats = function() {
		console.log("Price: ", this.price);
		console.log("Period: ", this.period);
		console.log("Income: ", this.income);
		if(this.daysInBuild > 0) {
			console.log("\nCLOSED\n");
		}
	}
} 

//***************************************

var Shop = function() {
	Building.call(this, 100, 30, 7, 20);
	this.add = function() {
		this.work = Building.work;
		this.buy  = Building.buy;
		this.viewStats = Building.viewStats;
	}
}

//***************************************
var House = function() {
	Building.call(this, 200, 50, 30, 100);
	this.add = function() {
		this.work = Building.work;
		this.buy  = Building.buy;
		this.viewStats = Building.viewStats;
	}
}

//***************************************
var Hospital = function() {
	Building.call(this, 3000, 100, 10, 70);
	this.add = function() {
		this.work = Building.work;
		this.buy  = Building.buy;
		this.viewStats = Building.viewStats;
	}
}

//***************************************
var  Paintball = function() {
	Building.call(this, 50000, 130, 60, 600);
	this.add = function() {
		this.work = Building.work;
		this.buy  = Building.buy;
		this.viewStats = Building.viewStats;
	}
}

//***************************************
var Zoo = function() {
	Building.call(this, 250000, 200, 1, 50);	
	this.add = function() {
		this.work = Building.work;
		this.buy  = Building.buy;
		this.viewStats = Building.viewStats;
	}
} 

//***************************************

function addBuilding(type, buildings) {
	var newBuilding;
	switch(type) {
	case 0: 
		newBuilding = new Shop();
		break;
	case 1:
		newBuilding = new House();
		break;
	case 2:
		newBuilding = new Hospital();
		break;
	case 3:
		newBuilding = new Paintball();
		break;
	case 4:
		newBuilding = new Zoo();
		break;
	}
	
	newBuilding.add();
	buildings.push(newBuilding);
}

function getEff(buildings, building) {
	var eff;
	for(var i = 0; i < buildings.length; i++) {
		eff += (buildings[i].income / buildings[i].period);
	}
	
	return ((1000000 + building.price) / ((building.income / building.period) + eff)) - (1000000 / eff);
}

function buy(buildings) {
	var priceList = [];
	var counter = 0;
	var bestEff = 0;
	var bestBuilding;
	
	if(money >= 250000) {
		addBuilding(4, priceList);
	}
	if(money >= 50000) {
		addBuilding(3, priceList);
	}
	if(money >= 3000) {
		addBuilding(2, priceList);
	}
	if(money >= 200) {
		addBuilding(1, priceList);
	} 
	if(money >= 100) {
		addBuilding(0, priceList);
	}
	if(priceList.length === 0) {
		return 0;
	}
	 
	for(var j = 0; j < priceList.length; j++) {
		 if(bestEff < getEff(buildings, priceList[j])) {
			 bestEff = getEff(buildings, priceList[j]);
			 bestBuilding = priceList[j];
		 } else {
			 counter++;
		 }
	 }
	 
	 if(counter === priceList.length - 1) {
		 return 0;
	 }
	 
	 buildings.push(bestBuilding);
	 money -= bestBuilding.price;
}

function work(buildings) {
	var i = buildings.length;
	while(i--) {
		buildings[i].work();
		console.log("Building: ", i, "\n");
		buildings[i].viewStats();
	}
}

var days = 1;
var buildings = [];

while(money <= 100) {
	
	buy(buildings);
	work(buildings);
	
	console.log("Money: ", money, "\nDays: ", days, "\n\n\n");
	console.log(buildings, "\n\n\n");
	days++;
}






