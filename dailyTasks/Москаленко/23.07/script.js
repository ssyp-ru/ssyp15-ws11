var Monkey = function(name, IQ) {
	this.name = name;
	this.sayName = function(){
		console.log(this.name);
	}
	this.IQ = IQ;
	this.sayIQ = function(){
		console.log(this.sayIQ);
	}
};

var Human = function(sayName, sayIQ) {
	Monkey.call(this, sayName, sayIQ);
};
Human.prototype = new Monkey();

var Digger_Online_PLAYER = function(sayName, sayIQ) {
	Monkey.call(this, sayName, sayIQ);
};
Digger_Online_PLAYER.prototype = new Monkey();

hum = new Human("Vasya", 100);
	hum.sayName();
	hum.sayIQ();

digger = new Digger_Online_PLAYER("Yxadi!!1!", 150);
	digger.sayName();
	digger.sayIQ();