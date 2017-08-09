// Malygin v1.1 log

var EventEmitter = require ("events");
var GDate = require ("./GDate.js");

var ee = new EventEmitter();

function GLog () {
	this.logs = [];

	this.add = function (message, source) {
		while (this.logs.length > 10)
			this.logs.shift();
		this.logs.push ("Time: " + GDate.getFullTime() + ", message: <<" + message + ">> from " + source);
	};

	this.get = function (x) {
		return this.logs[x];
	};

	this.getLast = function () {
		return this.logs[this.logs.length - 1];
	};

	this.getArray = function () {
		console.log(this.logs);
	};
}

module.exports = new GLog;