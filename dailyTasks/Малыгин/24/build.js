var capital = 250, m = [], vigoda = [], priceMass = [], pribil = 0, w = 0;

function BuildObj(name, price, days, period, moneyInCame){
	this.name = name;
	this.price = price;
	this.days = days;
	this.period = period;
	this.moneyInCame = moneyInCame;
	this.moneyInDay = 0;
	//this.flag = false;
}

BuildObj.prototype.sayName = function(){
	console.log(this.name);
}

m[0] = new BuildObj("Neboskreb", 500, 40, 5, 20);
m[1] = new BuildObj("Apteka", 100, 30, 6, 10);
m[2] = new BuildObj("Market", 250, 20, 3, 15);
m[3] = new BuildObj("House", 150, 20, 1, 0);

function moneyDay(){
	for(var i = 0;i<m.length;i++){
		m[i].moneyInDay = m[i].days / m[i].period * m[i].moneyInCame;
		//console.log(m[i].moneyInDay);
	}
}

function firstBuild(){
	do{
		for(var i = 0;i<m.length-w;i++)
			for(var j = 0;j<m.length-1-w;j++)
				if(m[j].moneyInDay < m[j+1].moneyInDay){
					var b = m[j];
					m[j] = m[j+1];
					m[j+1] = b;
				}
		if(m[0].price > capital ){
			m[m.length] = m[w];
			m.shift();
		}
		else
			break;
		console.log(m[w].price);
		w++;
	}while(m[w].price > capital);
		m[0].moneyInDay = m[0].days / m[0].period * m[0].moneyInCame;
		capital -= m[0].price;
}

function builder(){
	for(var i = 1;i<m.length;i++){
		vigoda[i] = m[i].price / (m[i].moneyInDay);
	}
	var money = m[0].moneyInDay;
	if(m.length>1){
		for(var i = 1;i<vigoda.length;i++){
			for(var j = 1;j<m.length-1;j++){
				if(vigoda[j] > vigoda[j+1])
				{
					var b = m[j];
					m[j] = m[j+1];
					m[j+1] = b;
				}
			}
		}
	}
	if(m.length>1){
		for(var i = 1;i<m.length-1;i++){
			pribil += m[i].days * (money);
			money = m[i].moneyInDay + money;
		}
	}
	capital += pribil;
	for(var i = 0;i<m.length;i++)
		m[i].sayName();
	if(m.length>1){
		for(var i = 1;i<m.length;i++)
			capital -= m[i].price;
	}
	console.log(capital);
}

moneyDay();

firstBuild();

builder();