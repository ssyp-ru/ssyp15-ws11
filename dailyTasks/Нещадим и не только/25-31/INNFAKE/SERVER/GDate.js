/* "GDate" Module, Korotkov Nikita, v3.2 */

/*
II Changelog:
II ver.1 - release;
II
II ver.2 - quest methods:
II questTime (questDaysWhileCompletable) - calculates quest deadline;
II questEnd (questDeadline) - returns true if the quest deadline came and false if it didn't;
II compare (firstDate, secondDate) - returns the latest date of the entered.
II
II ver.3 - now "getFullDate" function with an argument returns date in words.
*/


 function GDate (hou,min) {
	if(!min) min=0;
	 if(!hou) hou=0;
	if(!hou && !min)
	this.time = 1860*22/7 +50;
	else
	this.time=hou*60 +min*1;

	//console.log(this.time)
	this.getMinutes = function () {
		var min=this.time % 60;

		if(min<10)
		min="0"+min;

		return min;
	};

	this.getHours = function () {
		var h=Math.floor((this.time % 1440) / 60);
		if(h<10)
			h="0"+h;
		return h;

		return h;
	};

	this.getDay = function () {
		return (Math.floor(this.time / 1440));
	};

	this.getTime = function () {
		return (this.time);
	};

	this.getFullTime = function () {
		var hrs = this.getHours();
		var mins = this.getMinutes();
		if (this.getMinutes() % 60 < 10) {
			return (hrs + ":" + "0" + mins);
		} else {
			return (hrs + ":" + mins);
		}
	};
	this.isGreater=function(a) {
		//(a.time+" "+this.time);
		if(a.getHours()>this.getHours())
		{
			return false
		}

		if(a.getMinutes()>this.getMinutes())
		{
			return false;
		}
		return true;
	}
	this.fdHours = function (hrs1, hrs2) {
		if (hrs1 === 1) {
			if (hrs2 === 0) {
				var hrs = "ten ";
			}
			if (hrs2 === 1) {
				var hrs = "eleven ";
			}
			if (hrs2 === 2) {
				var hrs = "twelve ";
			}
		} else {
			if (hrs2 === 9) {
				var hrs = "nine ";
			}
			if (hrs2 === 8) {
				var hrs = "eight ";
			}
			if (hrs2 === 7) {
				var hrs = "seven ";
			}
			if (hrs2 === 6) {
				var hrs = "six ";
			}
			if (hrs2 === 5) {
				var hrs = "five ";
			}
			if (hrs2 === 4) {
				var hrs = "four ";
			}
			if (hrs2 === 3) {
				var hrs = "three ";
			}
			if (hrs2 === 2) {
				var hrs = "two ";
			}
			if (hrs2 === 1) {
				var hrs = "one ";
			}
			if (hrs2 === 0) {
				var hrs = "twelve ";
			}
		}
		return (hrs);
	};

	this.fdMinutes = function (min1, min2) {
		if (min1 === 1) {
			if (min2 === 0) {
				var mins = "ten ";
			}
			if (min2 === 1) {
				var mins = "eleven ";
			}
			if (min2 === 2) {
				var mins = "twelve ";
			}
			if (min2 === 3) {
				var mins = "thirteen ";
			}
			if (min2 === 4) {
				var mins = "fourteen ";
			}
			if (min2 === 5) {
				var mins = "fifteen ";
			}
			if (min2 === 6) {
				var mins = "sixteen ";
			}
			if (min2 === 7) {
				var mins = "seventeen ";
			}
			if (min2 === 8) {
				var mins = "eighteen ";
			}
			if (min2 === 9) {
				var mins = "nineteen ";
			}

		} else {
			if (min2 === 9) {
				var smins = "nine ";
			}
			if (min2 === 8) {
				var smins = "eight ";
			}
			if (min2 === 7) {
				var smins = "seven ";
			}
			if (min2 === 6) {
				var smins = "six ";
			}
			if (min2 === 5) {
				var smins = "five ";
			}
			if (min2 === 4) {
				var smins = "four ";
			}
			if (min2 === 3) {
				var smins = "three ";
			}
			if (min2 === 2) {
				var smins = "two ";
			}
			if (min2 === 1) {
				var smins = "one ";
			}
			if (min2 === 0) {
				var smins = "";
			}
			if (min1 === 0) {
				var fmins = "";
			}
			if (min1 === 2) {
				var fmins = "twenty ";
			}
			if (min1 === 3) {
				var fmins = "thirty ";
			}
			if (min1 === 4) {
				var fmins = "fourty ";
			}
			if (min1 === 5) {
				var fmins = "fifty ";
			}
			var mins = fmins + smins;
		}
		return (mins);
	}

	this.getFullDate = function (t) {
		var day = this.getDay();
		var hrs = this.getHours();
		var mins = this.getMinutes();
		if (t) {
			if (0 < hrs && hrs < 13) {
				var half = "AM";
			} else {
				var half = "PM";
			}
			var hrs1 = Math.floor(hrs % 12 / 10);
			var hrs2 = hrs % 12 % 10;
			hrs = this.fdHours(hrs1, hrs2);
			var mins1 = Math.floor(mins / 10);
			var mins2 = mins % 10;
			mins = this.fdMinutes(mins1, mins2);
			return ("It's " + hrs + mins + half + ".");
		} else {
			return ("День: "+day+", "+hrs+":"+mins);
		}
	};

	function increase() {
		//console.log(getFullTime());
		this.time++;
	};

	this.reset = function () {
		this.time = 1860;
	};

	this.questTime = function (date1) {
		return (this.time + date1);
	};

	this.questEnd = function (date1) {
		if (date1 < this.time) {
			return (true);
		} else {
			return (false);
		}
	};

	this.compare = function (date1, date2) {
		if (date1 > date2) {
			return (date1);
		} else {
			return (date2);
		}
	};

	//setInterval(increase, 1700);
};
//console.log(new GDate(5,59).isGreater(new GDate(5,58)));
module.exports = GDate;