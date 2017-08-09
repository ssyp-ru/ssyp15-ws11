var m = [];
function Creature(name){
	this.name = name;
}
Taxi.prototype = new Human();

Creature.prototype.sayName = function(){
	console.log("Creature: " + this.name);
}

Human.prototype = new Creature();

Human.prototype.sayName = function(){
	console.log("Human: " + this.name);
}

Taxi.prototype.sayName = function(){
	console.log("Taxi: " + this.name);
}

function Human(name, wear){
	Creature.call(this, name);
	this.wear = wear;
}


function Taxi(name, wear, car){
	Human.call(this, name, wear);
	this.car = car;
}

function massIn(){
	for(var i = 0;i<20;i++){
		var r = Math.floor(Math.random()*3);
		if(r === 0)
			m[i] = new Creature("Ameba");
		if(r === 1)
			m[i] = new Human("Ivan", "Stani");
		if(r === 2)
			m[i] = new Taxi("Kirill", "Pidjak", "Taxi");
	}
}

function massOut(){
	for(var i = 0;i<20;i++)
		m[i].sayName();
}

//var taxi = new Taxi("Kirill", "Pidjak", "Taxi");
//var human = new Human("Ivan", "Stani");
//var creature = new Creature("Ameba");

massIn();

massOut();

//console.log(taxi);
//console.log(human);
//console.log(creature);