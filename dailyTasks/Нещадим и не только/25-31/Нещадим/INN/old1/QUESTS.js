//Иван Резник и Кирилл Федосеев
//Версия - 2.0

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
function getBestQuest(quests) {
	var needestQuest = quests[0];
	for(var i = 0; i < quests.length; i++) {
		if(needestQuest.priority < quest[i].priority) {
		}
	}
	var curPriority = needestQuest.priority;
	var bestQuests = [];
	for(var i = 0; i < quests.length; i++) {
		if(quests[i].priority === curPriority) {
			bestQuests.push(quests[i]);
		}
	}
	return bestQuests[Math.floor(Math.random()*bestQuests.length)];
}
function GQuest() {
	this.quests = [];
	this.register = function(quest) {
		this.quests.push(quest);
	}
	this.get = function(player)
	{
		var q = quests.quests[Math.floor(Math.random()* quests.quests.length)];
		var questCopy = deepCopy(q);
		player.curQ = questCopy;
		console.log("выдал квест-"+ player.curQ.name);
		if(questCopy.targets[player.counter] === "random")
			player.curQ.targets[player.counter] = randTarget(player.start.name);

		player.setTarget(questCopy.targets[player.counter]);
	}
}
var quests = new GQuest();
function getQbyName(name)
{
	for(var i=0;i<quests.quests.length;i++)
	{
		if(quests.quests[i].name===name)
		{
			return quests.quests[i];
		}
	}
	return null;
}
var locations = ["mainHouse", "square", "soccer", "canteen", "shop", "pool", "workshops"];
function randTarget(a)
{
	var m=locations[Math.floor(Math.random()*locations.length)];
	while(m===a)
		m=locations[Math.floor(Math.random()*locations.length)];
	console.log(m);
	return m;
}

function Quest(name, targets, priority, npc, rewards, item) {
	this.name = name;
	this.priority = priority;
	this.npc = npc;
	this.rewards = rewards;//["XP", "money", "hp", "morale"]
	this.item = item;
	this.targets = targets;
	//this.timeLen = timeLen;
	//this.startTime = 0;
	//this.endTime = 0;
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

		if(player.start.id === player.curQ.targets[player.counter])
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
Quest.prototype.toString=function()
{
	return this.name;
}
quests.register(new Quest("Иди в магазин, потом иди в корпус", ["shop", "shop","canteen","shop","mainHouse"] , 0, false, [50, -10, 10, 20], null));
quests.register(new Quest("Найди бэйджик", ["square","square"] , 0, false, [50, 0, 0, 20], null));
quests.register(new Quest("Найди Софью Григорьевну и иди в корпус купи печенья]", ["random", "mainHouse"] , 0, false, [40, -5, 5, 10], null));
quests.register(new Quest("Иди в магазин и возвращайся в корпус", ["shop", "mainHouse"] , 0, false, [50, -10, 10, 20], null));
quests.register(new Quest("Найди бэйджик", ["random", "random"] , 0, false, [50, 0, 0, 20], /*бейджик*/null));
quests.register(new Quest("Найди Софью Григорьевну и иди в корпус, купи печенья", ["random", "mainHouse"] , 0, false, [40, -5, 5, 10], null));
quests.register(new Quest("Сходи на завтрак", ["canteen"], 0, false, [30, 0, 20, 5], null));
 quests.register(new Quest("Сходи на обед", ["canteen"], 0, false, [50, 0, 25, 5], null));
 quests.register(new Quest("Сходи на полдник", ["canteen"], 0, false, [30, 0, 10, 5], null));
 quests.register(new Quest("Сходи на ужин", ["canteen"], 0, false, [50, 0, 20, 5], null));
 quests.register(new Quest("Сходи на второй ужин", ["canteen"], 0, false, [50, 0, 10, 5], null));
quests.register(new Quest("Найди Татьяну Ивановну и возьми бейджик", ["random", "mainHouse"], 0, false, [20, 0, 0, -20], null));
quests.register(new Quest("Переоденься и пойди на футбольное поле, поиграй в футбол", ["mainHouse", "soccer"], 0, false, [30, 0, 10, 15/*случайное число*/], null));
quests.register(new Quest("Иди в корпус и ложись спать", ["mainHouse"], 0, false, [20, 0, 30, 30], null));
quests.register(new Quest("Выйди на зарядку", ["soccer"], 0, false, [30, 0, 10, 30], null));
quests.register(new Quest("Пропусти зарядку", ["mainHouse"], 0, false, [30, 0, 10, -30], null));
quests.register(new Quest("Выйди на линейку раньше Татьяны Ивановны", ["square"], 0, false, [20, 0, 0, 20], null));
quests.register(new Quest("Пропусти линейку", ["mainHouse"], 0, false, [20, 0, 0, -20], null));
quests.register(new Quest("Успей в мастерскую до начала занятий", ["workshops"], 0, false, [20, 0, 0, 20], null));
quests.register(new Quest("Опоздай в мастерскую", ["workshops"], 0, false, [20, 0, 0, -20], null));
quests.register(new Quest("Успей на лекцию", ["canteen"], 0, false, [40, 0, 0, 20], null));
quests.register(new Quest("Пропусти лекцию", ["mainHouse"], 0, false, [40, 0, 0, -20], null));
quests.register(new Quest("Прочти задачу дня и реши её", ["mainHouse", "random"], 0, false, [50, 20, 0, 40], /*бейджик*/ null));
quests.register(new Quest(/*Если встретил Татьяну Ивановну*/"Поздоровайся с Татьяной Ивановной", ["random"], 0, false, [10, 0, 0, 30], null));
quests.register(new Quest("Возьми фотографии в мастерской и отнеси их в бильярдную", ["workshops", "pool"], 0, false, [40, 0, 0, 30], null));
quests.register(new Quest(/*Если здоровье меньше определенного значения*/"Отправляйся в мед. пункт", ["mainHouse"], 0, false, [20, 0, 80,0 /*случайное число*/], null));
quests.register(new Quest("Приберись в своей комнате", ["mainHouse"], 0, false, [20, 0, 0, 10], null));
quests.register(new Quest("Сходи на фильм", ["canteen"], 0, false, [20, 0, 0, 10], null));
quests.register(new Quest("Отнеси стулья из мастерской в столовую", ["workshops", "canteen"], 0, false, [50, 0, 0, 30], null));
quests.register(new Quest("Займись перепродажей вещей из магазина: сходи в магазин и продай купленые вещи в корпусе",["shop", "mainHouse"], 0, false,
	[50, 20, 0, 20], null));//есть шанс, что кто-то заподозрит неладное, в следствие чего мораль уменьшится
quests.register(new Quest("Придумай шутку для КВН", ["random"], 0, false, [20, 0, 0, 10/*случайное число*/], null));
quests.register(new Quest("Помоги накрыть в столовой", ["canteen"], 0, false, [20, 0, 0, 15], null));
quests.register(new Quest("Поменяй свое постельное белье", ["mainHouse"], 0, false, [20, 0, 0, 15], null));
quests.register(new Quest("Сходи в душ", ["mainHouse"], 0, false, [20, 0, 0, 10], null));
quests.register(new Quest("Позвонить родителям", ["random"], 0, false, [20, 0, 0, 5], null));
quests.register(new Quest("Погладить кота", ["random"], 0, false, [40, 0, 0, 40], null));
quests.register(new Quest("Встреть родственников у ворот", ["gate"], 0, false, [20, 0, 20, 5], null));

//
module.exports.quests = quests;
exports.getQbyName=getQbyName;