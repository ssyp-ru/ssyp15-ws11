//Malygin v1.0 Player, Log

var GLog = require("./log.js");
//var GLog = g.GLog;
//var Message = g.Message;
var Player = require("./player.js");

/*
var GDate = function() {
	var day = 1, hour = 7, minute = 0, i;
	
	setInterval(timePlus, 1700);
	
	function timePlus() {
		minute++;
	
		if (minute === 60) {
			minute = 0;
			hour++;
		};
		
		if(minute < 10) minute = "0" + minute;
		
		if (hour === 24) {
			hour = 0;
			day++;
		};
	};
	
	
	this.getTime = function() {
		return(hour + ":" + minute);
	};
	
	this.getMinutes = function() {
		return(minute);
	};
	
	this.getDay = function() {
		return(day);
	};
	
	this.getHours = function() {
		return(hour);
	};
	
	this.Reset = function() {
		day = 1;
		hour = 7;
		minute = 0;
		return("Time is reset.");
	};
}

function GLog(n){
	this.logs = [];
}

function Message(message, source){
	this.message = message;
	this.time = getTime;
	this.source = source;
}

GLog.prototype.add = function(message){
	this.logs.push(message);
}

GLog.prototype.get = function(x){
	return this.logs[x];
}

GLog.prototype.getLast = function(){
	return this.logs[this.logs.length-1];
}

GLog.prototype.getArray = function(){
	while(this.logs.length>10)
		this.logs.shift();
	console.log(this.logs);
}

function Message(message, source){
	this.message = message;
	this.time = 0;
	this.source = source;
}

GLog.prototype.add = function(message){
	this.logs.push(message);
}

GLog.prototype.get = function(x){
	return this.logs[x];
}

GLog.prototype.getLast = function(){
	return this.logs[this.logs.length-1];
}

GLog.prototype.getArray = function(){
	while(this.logs.length>10)
		this.logs.shift();
}

/*function Player(name, gend, lv, ml, home){
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
	if(this.xp >= this.lv * 100){
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
}*/
var player = new Player("Player", "m");
var npc = new Player("NPC", "f", 2, 3, "Corpus");
var log = new GLog(10);
log.addMessage("Privet", "Artyom");
console.log(log.getLastMessage());