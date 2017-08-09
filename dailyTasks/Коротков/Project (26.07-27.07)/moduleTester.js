var EventEmitter = require ("events");
var gdate = require ("./GDate.js");
var glog = require ("./GLog.js");

var ee = new EventEmitter();

ee.on ("Message", function (msg, src) {
	glog.add (msg, src);
	console.log (glog.getLast())
});

if (gdate.getTime() % 5 === 0) {
	ee.emit ("Message", "Nice to meet you!", "Vitko");
}