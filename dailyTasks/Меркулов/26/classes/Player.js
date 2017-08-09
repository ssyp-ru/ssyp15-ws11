function Player(name, gend, lv, ml, home, players){
	this.name = name;
	this.id = 0;
	this.quests = [];
	
	if(lv) {
		this.lv = lv;
	} else {
		this.lv = 1;
	}
	
	this.xp = 0;
	
	if(ml) {
		this.ml = ml;
	} else {
 		this.ml = 0;
	} 
	
	this.hp = 100;
	this.qC = 0;
	this.gotBadge = true;
	this.speed = 5;
	this.items = [];
	this.money = 1000;
	this.start = 0;
	this.end = 0;
	this.city = 0;
	
	if(home) { 
		this.home = home;
		this.city = home;
	} else {
		this.home = null;
		this.city = null;
	} 
	
	this.curQ = 0;
	this.way = 0;
	this.gotPhone = true;
	this.gend = gend;
	this.targets = [];
	
	if(lv) {
		this.npc = false;
	} else {
 		this.npc = true;
	}
	
	this.addXP = function(xp){
		this.xp += xp;
	
		while(this.xp >= this.lv * 100) {
			this.xp -= 100 * this.lv;
			this.lv += 1;
		}
		return this.xp;
	}

	this.addHP = function(hp){
		this.hp += hp;
		if(this.hp > 100) {
			this.hp = 100;
		} 
	
		return this.hp;
	}

	players.push(this);
}

module.exports = Player;
