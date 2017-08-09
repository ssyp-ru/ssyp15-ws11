var money  = 100;

var Building = function(price, dib, period, income) {
	this.price    = price; 
	this.period_c = period; 
	this.income   = income;
	
	this.period = period;
	this.daysInBuild = dib;
} 

var Shop = function() {
	Building.call(this, 100, 30, 7, 20);
}

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


var shop = new Shop();
var i = 1;
shop.work = Building.work;
money -= shop.price;

while(money !== 1000) {
	shop.work();
	
	console.log("\nMoney: ", money);
	console.log("\nPeriod: ", shop.period);
	console.log("\nIncome: ", shop.income);
	console.log("\nDay: ", i, "\n");
	
	if(shop.daysInBuild > 0) {
		console.log("\nCLOSED\n");
	}
	
	console.log("\n\n\n");

	i++;
}


