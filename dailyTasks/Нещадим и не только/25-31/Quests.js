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

module.exports = Quest_idle;
module.exports = Quest_1;