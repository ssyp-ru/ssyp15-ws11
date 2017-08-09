//ver 1.0 Author: Moskalenko K.


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
	
	this.getFullDate = function() {
		var digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
		return("Day: " + this.getDay() + "; time: " + digits[this.getHours()] + " hours, " + digits[this.getMinutes()] + " minutes.");
	};
}

var gDate = new GDate;
//setInterval(function() {console.log(gDate.getMinutes())}, 1700);

module.exports = GDate;