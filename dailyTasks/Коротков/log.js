//Malygin v1.0 log

var GDate = require("./gdate.js");

function GLog(n){
	this.logs = [];
}

function Message(message, source){
	this.message = message;
	this.time = gDate.getTime();
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

var gDate = new GDate;
var log = new GLog(10);
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.add(new Message("Privet", "Artyom"));
log.getArray();
console.log(log.getLast());
//module.exports = GLog;