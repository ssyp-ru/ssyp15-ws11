var GQuest = require("./classes/GQuest.js");
var Player = require("./classes/Player.js");

var towns   = [];
var roads   = [];
var players = [];

function random(i) {
	return Math.floor(Math.random() * i);
}

var Town = function(name) {
	this.name = name;
	towns.push(this);
}

var Quest_idle = function() {
		this.name = "IDLE";
		this.priority = 0;
		this.canStop  = true;
		this.type = 0;
		this.bonusType = "nothing";
		this.timer = 0;
		
		this.target = 0;
		
		this.checkEnd = function(player) {

		}
		
		this.getLocation = function() {
		
		}
}

var Quest_1 = function() {
		this.name = "quest I";
		this.priority = 5;
		this.canStop  = false;
		this.type = 0;
		this.bonusType = "XP";
		//this.timer = gDate.getTime() + 999999;
		
		this.target = towns[random(towns.length)];
		
		this.checkEnd = function(player) {
			if(player.city === this.target) {
				player.addXP(500);
				player.curQ = 0;
			}/* else if(gDate.getTime() === this.timer) {
				player.curQ = 0;
			}*/
		}
		
		this.getLocation = function() {
			return target.name;
		}
}

function initPlayers(i) {
	for(;i > 0; i--) {
		var new_player = new Player("PLAYER", 0, 1, 0, town, players);
		new_player.curQ = new Quest_idle();
		players.push(new_player);
	}
}

var town = new Town("TOWN");

initPlayers(1);

var q1 = new Quest_1(1);
var quests = new GQuest();

quests.register(q1);
quests.getQuest(players[0]);

console.log("G-QUESTS: ", quests);
console.log("PLAYER QUESTS: ", players[0].curQ, " - ", players[0].quests);

players[0].curQ.checkEnd(players[0]);
console.log(players[0]);

