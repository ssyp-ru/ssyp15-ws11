//ver 2.0 Author: Moskalenko K.

function digitToString(digit) {
	var digit = digit;
	
	var result, one, ten, tenAndOne, hundreds;
	var digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
	var digitsTen = ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
	var hundred = " hundred ";
	
	if(digit <= 20 && digit >= 0) result = digits[digit];
	
	if(digit > 20 && digit < 100) result = (digitsTen[Math.floor(digit / 10)-1] + " " + digits[digit % 10]);
	if(digit > 20 && digit < 100 && digit % 10 === 0) result = (digitsTen[Math.floor(digit / 10)-1]);
	
	if(digit >= 100 && digit < 1000) {
		hundreds = Math.floor(digit / 100);
		ten = Math.floor(digit / 10) % 10;
		tenAndOne = digit % 100;
		one = digit % 10;
	};
	
	if(hundreds > 1) hundred = " hundreds ";
		else hundred = " hundred ";
	
	if(digit >= 100 && digit < 1000 && tenAndOne === 0)
		result = (digits[hundreds] + hundred);
	else if(digit > 120 && digit < 1000 && ten === 0)
		result = (digits[hundreds] + hundred + digits[one]);
	else if(digit > 120 && digit < 1000 && one === 0)
		result = (digits[hundreds] + hundred + digitsTen[ten-1]);
	else if (digit > 100 && digit < 1000 && tenAndOne >= 0 && tenAndOne <= 20) 
		result = (digits[hundreds] + hundred + digits[tenAndOne]);
	else if(digit > 120 && digit < 1000)
		result = (digits[hundreds] + hundred + digitsTen[ten-1] + " " + digits[one]);
	
	return(result);
};


var GDate = function() {
	var day = 1, hour = 7, minute = 0, i;
	
	setInterval(timePlus, 1700);
	
	function timePlus() {
		minute++;
	
		if (minute === 60) {
			minute = 0;
			hour++;
		};
		
		if (hour === 24) {
			hour = 0;
			day++;
		};
	};
	
	
	this.getTime = function() {
		return(this.getHours() + ":" + this.getMinutes());
	};
	
	this.getMinutes = function() {
		var minuteString;
		
		if (minute < 10)
			minuteString = "0" + minute;
		else
			minuteString = minute;
		
		return(minuteString);
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
	
	this.getFullDate = function(n) {
		var res, localMinute;
			
			if (minute <= 1)
				localMinute = " minute";
			else
				localMinute = " minutes";
			
		if(n === "text") 	
			res = ("Day: " + digitToString(day) + "; time: " + digitToString(hour) + " hours, " + digitToString(minute) + localMinute + ".");
		else 
			res = ("Day: " + this.getDay() + "; time: " + this.getTime());
		
		return(res);
	};
};