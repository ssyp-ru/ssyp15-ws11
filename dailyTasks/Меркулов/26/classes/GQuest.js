var GQuest = function() {
	this.gQuests = [];
	
	this.register = function(quest) {
		this.gQuests.push(quest);
	}
	
	this.questSort = function(quest_1, quest_2) {
		if(quest_1.priority < quest_2.priority) {
			return 1;
		} else if(quest_1.priority > quest_2.priority) {
			return -1;
		} else {
			return 0;
		}
	}
	
	this.getQuest = function(player) {
		if(player.quests.length <= 10 && this.gQuests.length !== 0) {
			this.gQuests.sort(this.questSort);
			
			if(player.curQ.canStop) {
				player.quests.push(player.curQ);
				player.curQ = this.gQuests[0];
			} else {
				player.quests.push(this.gQuests[0]);
			}
			
			this.gQuests.shift();
		}
	}
}

module.exports = GQuest;