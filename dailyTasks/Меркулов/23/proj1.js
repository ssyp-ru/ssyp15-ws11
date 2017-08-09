function random(i) {
	return Math.floor(Math.random() * i);
}

function filter_t(mobs, team) {
	var mobs_f = [];
	var i = 0;
	
	while(true) {
		if(mobs[i].TEAM === team && mobs[i].ALIVE) {
			mobs_f.push(mobs[i]);
		}
		
		if(i === mobs.length - 1) {
			break;
		}
		
		i++;
	}
	
	return mobs_f;
}

function filter_e(mobs, team) {
	var mobs_f = [];
	var i = 0;
	
	while(true) {
		if(mobs[i].TEAM !== team && mobs[i].ALIVE) {
			mobs_f.push(mobs[i]);
		}
		
		if(i === mobs.length - 1) {
			break;
		}
		
		i++;
	}
	
	return mobs_f;
}

/* CREATURES */
var Creature = function(name, team) {
	this.HP    = 10 + random(5);
	this.DEF   = 3 + random(2);
	this.DMG   = 5 + random(5);
	this.LUCK  = 5;
	this.SPEED = 5 + random(3);
	this.ALIVE = true;
	this.NAME  = name;
	this.TEAM  = team;
	DrawName   = function () {
		console.log(name);
	}
}

var Human = function(name,team){
	Creature.call(this, name, team);
}

var Warrior = function(name, team) {
	Human.call(this, name, team);
	DrawName = function () {
		console.log("***\\",name,"/***")
	}
	if (Warrior.checkAlive()){
		DrawName();
	}
} 

Warrior.doDMG = function(invader) {
	if(this.DEF) {
		this.DEF--;
	} else {
		this.HP = this.HP - invader.DMG - (invader.LUCK - this.LUCK);
	}
}

Warrior.checkAlive = function() {
		if(this.HP <= 0) {
			this.HP = 0;
			this.ALIVE = false;
			return false;
		} else {
			return true;
		}
}

/* BATTLE */

function fight(first, second) {
	var player = 1;
 	
	first.doDMG = Warrior.doDMG;
	first.checkAlive = Warrior.checkAlive;
	second.doDMG = Warrior.doDMG;
	second.checkAlive = Warrior.checkAlive;
	
	while(true) {
		if(player % 2 === 0) {
			second.doDMG(first);
		} else {
			first.doDMG(second);
		}
		player++;
		
		if(!first.checkAlive()) {
			console.log(second.NAME, " win!   ",second.TEAM, "\n" );
			break;
		} else if(second.checkAlive()) {
			console.log(first.NAME, " win!   ",second.TEAM, "\n");
			break;
		}
	}
}

function battle(mob1, mob2) {
	if(mob1.SPEED > mob2.SPEED) {
		fight(mob1, mob2);
	} else if(mob1.SPEED < mob2.SPEED) {
		fight(mob2, mob1);
	} else {
		if(!random(2)) {
			fight(mob2, mob1);
		} else {
			fight(mob1, mob2);
		}
	}
}

var mobs   = [];
var mobs_f = [];

var first;
var second;

var team = 0;

for(var i = 0; i < 100; i++) {
	mobs[i] = new Warrior("W" + i, random(6));
}

while(true) {
	mobs_f = filter_t(mobs, team);
	first  = mobs_f[random(mobs_f.length - 1)];
			
	if(mobs_f.length === 0) {
		break;
	}
	
	mobs_f = filter_e(mobs, team);
	second = mobs_f[random(mobs_f.length - 1)];
			
	if(mobs_f.length === 0) {
		break;
	}
			
	battle(first, second);
	
	if(team === 5) {
		team = 0;
	} else {
		team++;
	}
}