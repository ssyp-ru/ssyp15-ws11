/*function mob() {
	
	return {name: "OPK",
		   HP: 100,
		   dead: false,
		   damage: Math.floor(Math.random()*100)};
}*/

var mobType = function(name, damage, hp){
	this.name = name;
	this.hp = hp;
	this.alive = true;
	this.damage = damage;
	//this.size = size;
}

function random(r){
	return Math.floor(Math.random());
}

var hobbit = new mobType("Hobbit", 60, 20);
var warrior = new mobType("Warrior", 90, 60);
var elf = new mobType("Elf", 70, 40);

function fight() {
	while(((hobbit.alive !== false) || ((warrior.alive !== false) || ((elf.alive !== false)){
		if ((hobbit.alive !== false) && (warrior.alive != false) && (elf !== false)){
			hobbit.hp -= warrior.damage + Math.floor(Math.round()*10-5);
			warrior.hp -= elf.damage + Math.floor(Math.round()*10-5);
			elf.hp -= hobbit.damage + Math.floor(Math.round()*10-5);
			if(hobbit.hp<=0){
				hobbit.alive = true;
				break;
			}
			if(warrior.hp<=0){
				warrior.alive = true;
				break;
			}
			if(elf.hp<=0){
				elf.alive = true;
				break;
			}
		}
	}
		
}

fight();