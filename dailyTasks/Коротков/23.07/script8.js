var Villager = function  (name, age) {
	this.name = name;
	this.age = age;
	this.inventory = [];
	this.tell = function () {
		console.log ("My name is " + this.name + ". I'm " + this.age + " years old.")
	}
}

var ModernVillager = function(name, age, money) {
	this.money = money;
	Villager.call(this, name, age)
}

ModernVillager.prototype = new Villager();

var farmer = new Villager ("John", 42);

var farmer2 = new ModernVillager ("Tom", 23, 38947669);

var ModernVillagerSon = function (name, age, toys) {
	this.toys = [];
	ModernVillager.call(this, name, age);
}

ModernVillagerSon.prototype = new ModernVillager();

var tommy = new ModernVillagerSon ("Tommy", 8, 6);

tommy.tell();
farmer.tell();
farmer2.tell();