var Player = function(name, gend, lv, ml, home){
	this.name = name;
	this.id = 0;
	this.quests = [];
	if(lv)
		this.lv = lv;
	else
		this.lv = 1;
	this.xp = 0;
	if(ml)
		this.ml = ml;
	else
		this.ml = 0;
	this.hp = 100;
	this.qC = 0;
	this.gotBadge = true;
	this.speed = 5;
	this.items = [];
	this.money = 1000;
	this.start = 0;
	this.end = 0;
	if(home)
		this.home = home;
	else
		this.home = null;
	this.curQ = 0;
	this.way = 0;
	this.gotPhone = true;
	this.gend = gend;
	this.targets = [];
	if(lv)
		this.npc = false;
	else
		this.npc = true;
}

Player.prototype.addXP = function(xp){
	this.xp += xp;
	while(this.xp >= this.lv * 100){
		this.xp -= 100 * this.lv;
		this.lv += 1;
	}
	return this.xp;
}

Player.prototype.addHP = function(hp){
	this.hp += hp;
	if(this.hp > 100)
		this.hp = 100;
	return this.hp;
}

/*var player = new Player("Elf", "m");
console.log(player.addXP(300));
console.log(player.lv);*/
module.exports = Player;