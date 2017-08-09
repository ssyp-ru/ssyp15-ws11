var money = 100, days = 0, i, x = 380;
var building = function(name, price, daysToBuild, period, income) {
	this.name = name;
	this.price = price; 
	this.daysToBuild = daysToBuild; 
	this.period = period;
	this.income = income;
	var curDay = 0;
	
	this.check = function() {
		if(this.daysToBuild > 0) {
			this.daysToBuild--;
			console.log("Days to finish building:",(daysToBuild)-i);
			return;
		}
		curDay++;
		if(curDay === this.period) {
			curDay = 0;
			money = money + this.income;
		};	
	};
};

a = new building("Pharmacy", 100, 30, 7, 20);
	money = money - a.price;
	for(i = 0; i < x; i++) {
		a.check();
		console.log("Income:",money);
	}
	
b = new building("Pharmacy2", 300, 50, 30, 100);
	money = money - a.price;
	for(i = 0; i < x; i++) {
		a.check();
		console.log("Income:",money);
	}
	
c = new building("Pharmacy3", 3000, 100, 10, 70);
	money = money - a.price;
	for(i = 0; i < x; i++) {
		a.check();
		console.log("Income:",money);
	}

d = new building("Pharmacy4", 50000, 130, 60, 600);
	money = money - a.price;
	for(i = 0; i < x; i++) {
		a.check();
		console.log("Income:",money);
	}
	
e = new building("Pharmacy5", 250000, 200, 1, 50);
	money = money - a.price;
	for(i = 0; i < x; i++) {
		a.check();
		console.log("Income:",money);
	}
/*
		var build = function() {
		money = money - price;
		for (i=0; i < building.daysToBuild+1; i++) {			
				if (i === building.daysToBuild) {
				isBuilded = true;
				break;
			}
			else {
				console.log("Days to finish building:",(daysToBuild)-i)
				isBuilded = false;
			};
		};
		return(isBuilded);
	};
		
		var income2 = function() {
			while (isBuilded === true) {
				for (i = 0; i < building.period; i++) {
					if (i = building.period) {
						money = money +  building.income;
						console.log("Money:",money+"$");
					};
				debugger;
				};
			};	
		};
*/