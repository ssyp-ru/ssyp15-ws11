//Иван Резник и Кирилл Федосеев
//Версия - 2.0

var GTime= require("./GDate");
//var GTime = new GDate();
function Player()
{

}
deepCopy = function(o) {
	var copy = o,k;

	if (o && typeof o === 'object') {
		copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
		for (k in o) {
			copy[k] = deepCopy(o[k]);
		}
	}
	return copy;
}

var player = new Player();
function GQuest() {
	this.quests = [];
	this.getBestQuest = function() {
	var needestQuest = this.quests[0];
	for(var i = 0; i < this.quests.length; i++) {
		if(needestQuest.priority < this.quests[i].priority) {
			needestQuest = this.quests[i];
		}
	}
	var curPriority = needestQuest.priority;
	var bestQuests = [];
	for(var i = 0; i < this.quests.length; i++) {
		if(this.quests[i].priority === curPriority) {
			bestQuests.push(this.quests[i]);
		}
	}
	return bestQuests[Math.floor(Math.random()*bestQuests.length)];
}
	this.register = function(quest) {
		this.quests.push(quest);
	}
	this.get = function(player)
	{
		var q = getBestQuest();
		var questCopy = deepCopy(q);
		player.curQ = questCopy;
		if(player.curQ.timeLen !== 0)
		{
			player.curQ.startTime = GTime.time;
			player.curQ.endTime = player.curQ.startTime + player.curQ.timeLen;
		}
		if(questCopy.targets[player.counter] === "random")
			player.curQ.targets[player.counter] = randTarget(player.start.name);
		player.setTarget(questCopy.targets[player.counter]);
	}
}
var quests = new GQuest();
var locations = ["mainHouse", "square", "soccer", "canteen", "shop", "pool", "workshops"];
function randTarget(a)
{
	var m = locations[Math.floor(Math.random() * locations.length)];
	while(m === a)
		m = locations[Math.floor(Math.random() * locations.length)];
	console.log(m);
	return m;
}

function Quest(name, targets, priority, npc, rewards, item, timeLen)
{
	this.name = name;
	this.priority = priority;
	this.npc = npc;
	this.rewards = rewards;//["XP", "money", "hp", "morale"]
	this.item = item;
	this.targets = targets;
	this.timeLen = timeLen;
	this.startTime = 0;
	this.endTime = 0;
	this.Delete = function(player)
	{
		for(var i = 0; i < player.quests.length; i++)
		{
			if(player.quests[i] === this)
			{
				player.quests.splice(i, i + 1);
			}
		}
		
		player.targets=[];
		player.curQ = null;
		player.counter = 0;
	}
	this.getName = function()
	{
		return name;
	}
	this.check = function(player)
	{
		if(player.curQ.endTime > GTime.time)
		{
			player.curQ.Delete(player);
		}
		else if(player.start.id === player.curQ.targets[player.counter])
		{
			if(player.counter + 1 < player.curQ.targets.length)
			{
				player.counter++;
				if(player.curQ.targets[player.counter] === "random")
					player.curQ.targets[player.counter] = randTarget(player.start.name);

				player.setTarget(player.curQ.targets[player.counter]);
			}
			if(player.counter + 1 >= player.curQ.targets.length)
			if(player.start.id === player.curQ.targets[player.curQ.targets.length - 1])
			{
				player.qc++;	
				player.addXP(rewards[0]);
				player.money += rewards[1];
				player.addHp(rewards[2]);
				player.ml += rewards[3];
				//player.counter=0;
				if(item !== null)
				{
					player.addItem(item);
				}
				console.log(player.name + " выполнил " + player.curQ.name);
				player.curQ.Delete(player);
			//	console.log(player);
			}
		}
		/*if(player.curQ)
		if(player.curQ.priority !== 0)
		
			for(var i = 0; i < player.quests.length; i++)
			{
				if(player.quests[i].priority === 0)
				{
					player.curQ = player.quests[i];
					player.setTarget(player.quests[i].targets[player.counter]);
					break;	
				}
			}*/

	}
}
quests.register(new Quest("Иди в магазин, потом иди в корпус", ["shop", "shop","canteen","shop","mainHouse"] , 0, false, [50, -10, 10, 20], null));

module.exports = quests;