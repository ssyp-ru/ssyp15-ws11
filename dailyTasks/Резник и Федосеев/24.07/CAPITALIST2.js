console.clear();
var startCapital = 100;
var capital = startCapital;
var finalCapital = 1000000;
var time = 0;
var inf = 999999999;
var collectionOfBuildings = [];
function Building(price, daysToBuild, period, money)
{
	this.price = price;
	this.daysToBuild = daysToBuild;
	this.period = period;
	this.money = money;
	this.endTime = inf;
	this.isBuild = false;
	this.minDays = 0;
	this.Build = function(startTime)
	{
		//if(this.price <= Capital)
		//{
			capital -= this.price;
			this.endTime = startTime + this.daysToBuild;
			this.isBuild = true;
			this.minDays = inf;
			//collectionOfBuildings.push(new Building(this.price, this.daysToBuild, this.period, this.money));
		//}
		//console.log("Day -", time,"| Buy", this, "| Capital -", capital, "| First earn -", this.endTime + period, "day");
		return 0;
	}
	this.GetMoney = function(time)
	{
		if((time > this.endTime)&&((time - this.endTime)%this.period === 0))
		{
			capital += this.money;
			//console.log("Day -", time, "| Earn", this.money, "from", this, "| Capital -", capital);
		}
		return 0;
	}
}
for(var i = 0; i <= 1400; i++)
{
	collectionOfBuildings.push(new Building(100, 30, 7, 20));
	collectionOfBuildings.push(new Building(200, 50, 30, 100));
}
for(var i = 0; i <= 500; i++)
{
	collectionOfBuildings.push(new Building(3000, 100, 10, 70));
}
for(var i = 0; i <= 300; i++)
{
	collectionOfBuildings.push(new Building(50000, 130, 60, 600));
}
for(var i = 0; i <= 10; i++)
{
	collectionOfBuildings.push(new Building(250000, 200, 1, 50));
}
var goodBuildings = [];
function GetMoneyFromAll(time)
{
	for(var i = 0; i < collectionOfBuildings.length; i++)
	{
		collectionOfBuildings[i].GetMoney(time, capital);
	}
	return 0;
}
function UpdateMinDays()
{
	for(var i = 0; i < collectionOfBuildings.length; i++)
	{
		var col = collectionOfBuildings[i];
		if(!col.isBuild)
			col.minDays = Math.ceil((finalCapital - capital + col.price)/col.money*col.period) + col.daysToBuild;
	}
	return 0;
}
function GetGood()
{
	for(var i = 0; i < collectionOfBuildings.length; i++)
	{
		if((collectionOfBuildings[i].price <= capital)&&(!collectionOfBuildings[i].isBuild)&&((finalCapital - capital)/CountAllEarn() > (finalCapital - capital + collectionOfBuildings[i].price)/(CountAllEarn() + collectionOfBuildings[i].money/collectionOfBuildings[i].period)))
		{
			goodBuildings.push(collectionOfBuildings[i]);
		}
	}
	return 0;
}
function CountAllEarn()
{
	var count = 0;
	for(var i = 0; i < collectionOfBuildings.length; i++)
	{
		if(collectionOfBuildings[i].endTime < time)
		{
			count += collectionOfBuildings[i].money/collectionOfBuildings[i].period;
		}
	}
	return count;
}
function GetBest()
{
	if(goodBuildings.length > 0)
	{
		var min = goodBuildings[0];
		for(var i = 0; i < goodBuildings.length; i++)
		{
			//(goodBuildings[i].minDays < min.minDays)
			if((goodBuildings[i].minDays < min.minDays)||((goodBuildings[i].minDays === min.minDays)&&(goodBuildings[i].price < min.price))||((goodBuildings[i].minDays === min.minDays)&&(goodBuildings[i].daysToBuild < min.daysToBuild)))
			{
				if((finalCapital - capital)/CountAllEarn() > (finalCapital - capital + goodBuildings[i].price)/(CountAllEarn() + goodBuildings[i].money/goodBuildings[i].period))
					min = goodBuildings[i];
			}
		}
		return min;
	}
	return 0;
}
GetMoneyFromAll(time);
while(capital < finalCapital)
{
	UpdateMinDays();
	GetGood();
	//console.log(capital);
	//console.log(goodBuildings);
	while(goodBuildings.length > 0)
	{
		GetBest().Build(time);
		goodBuildings = [];
		GetGood();
	}
	//console.log(capital);
	GetMoneyFromAll(time);
	goodBuildings = [];
	time++;
	console.log("Day", time);
}
console.log(capital);
//console.log(collectionOfBuildings);