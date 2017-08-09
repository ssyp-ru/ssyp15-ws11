var players = [];

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

function lvSort(pl_1, pl_2) {
	var plExp_1 = pl_1.lv * 100 + pl_1.xp;
	var plExp_2 = pl_2.lv * 100 + pl_2.xp;
	
	if(plExp_1 < plExp_2) {
		return 1;
	} else if(plExp_1 > plExp_2) {
		return -1;
	} else {
		return 0;
	}

}

function qcSort(pl_1, pl_2) {
	if(pl_1.qC < pl_2.qC) {
		return 1;
	} else if(pl_1.qC > pl_2.qC) {
		return -1;
	} else {
		return 0;
	}
}

var player_1 = new Player("PLAYER1", 0, 1, 0, 0, players);
var player_2 = new Player("PLAYER2", 0, 2, 0, 0, players);
var player_3 = new Player("PLAYER3", 0, 3, 0, 0, players);
var player_4 = new Player("PLAYER4", 0, 2, 0, 0, players);

players.sort(qcSort);
console.log(players);