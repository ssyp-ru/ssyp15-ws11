//Malygin v1.0 log

var GDate = require("./gdate.js");

function GLog(maxLen){
	this.maxLen = maxLen;
	this.logs = [];
}

GLog.prototype.addMessage = function(message, source){
	this.logs.push({message:message, source:source, time:gDate.getTime()});
}

GLog.prototype.getMessage = function(x){
	return this.logs[x];
}

GLog.prototype.getLastMessage = function(){
	return this.logs[this.logs.length-1];
}

GLog.prototype.checkLog = function(){
	while(this.logs.length>this.maxLen)
		this.logs.shift();
	console.log(this.logs);
}

var gDate = new GDate;
var log = new GLog(10);
/*log.add("Privet1", "Artyom");
log.add("Privet2", "Artyom");
log.add("Privet3", "Artyom");
log.add("Privet4", "Artyom");
log.add("Privet5", "Artyom");
log.add("Privet6", "Artyom");
log.add("Privet7", "Artyom");
log.add("Privet8", "Artyom");
log.add("Privet9", "Artyom");
log.add("Privet10", "Artyom");
log.add("Privet11", "Artyom");
log.add("Privet12", "Artyom");
log.add("Privet13", "Artyom");
log.add("Privet14", "Artyom");
log.check();
console.log(log.getLast());*/
module.exports = GLog;