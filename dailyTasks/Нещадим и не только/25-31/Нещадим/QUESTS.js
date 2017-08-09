//Иван Резник и Кирилл Федосеев
//Версия - Alpha 0.0.2
function Player()
{
	
}
var player = new Player();
function GQuest() {
	this.quests = [];
	this.register = function(quest) {
		quests.push(quest);
	}
	this.get = function(player)
	{
		player.curQ = quests[Math.Floor(Math.random()*quests.length)];
	}
}
var quests = new GQuest();
function Quest(name, targets, priority, npc, rewards, item)
{
	this.name = name;
	this.priority = priority;
	this.npc = npc;
	this.rewards = rewards;//["XP", "money", "hp", "morale"]
	this.item = item;
	this.targets = targets;
	this.startQuest = function(player)
	{
		player.setTarget(target);
	}
	this.Delete = function(player)
	{
		for(var i = 0; i < player.quests.length; i++)
		{
			if(player.quests[i] === this)
			{
				player.quests.splice(i, i + 1);
			}
		}
	}
	this.getName= function()
	{
		return name;
	}
	this.check = function(player)
	{
		if(player.end === this.targets[0])
		{
			this.targets.unshift();
			if(this.targets.length === 0)
			{
				player.qc++;
				player.addXP(rewards[0]);
				player.money += rewards[1];
				player.addHp(rewards[2]);
				player.ml += rewards[3];
				if(item !== null)
				{
					player.items.push();
				}
				this.Delete(player);
			}
		}
	}
}
quests.register(new Quest("Иди в магазин, потом иди в корпус", ["Магазин", "Корпус"] , 0, false, [50, -10, 10, 20], null));

module.exports=quests;