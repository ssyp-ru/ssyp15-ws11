//Иван Резник и Кирилл Федосеев
//Версия - 1.1.0

function Player()
{

}
var player = new Player();
function GQuest() {
	this.quests = [];
	this.register = function(quest) {
		this.quests.push(quest);
	}
	this.get = function(player)
	{
		player.curQ=quests.quests[0];
		if(quests.quests[0].targets[player.counter] === "random")
			player.setTarget(randTarget);
		else	
			player.setTarget(quests.quests[0].targets[player.counter]);
	}
}
var quests = new GQuest();
var locations = ["mainHouse", "square", "soccer", "canteen", "shop", "pool", "workshops"];
function randTarget()
{
	return location[Math.floor(Math.random()*locations.length)];
}
function Quest(name, targets, priority, npc, rewards, item)
{
	this.name = name;
	this.priority = priority;
	this.npc = npc;
	this.rewards = rewards;//["XP", "money", "hp", "morale"]
	this.item = item;
	this.targets = targets;
	this.Delete = function(player)
	{
		for(var i = 0; i < player.quests.length; i++)
		{
			if(player.quests[i] === this)
			{
				player.quests.splice(i, i + 1);
			}
		}
		player.curQ = null;
		player.counter = 0;
	}
	this.getName= function()
	{
		return name;
	}
	this.check = function(player)
	{
		if(player.start.id === this.targets[player.counter])
		{
			//console.log(player.counter);
			//console.log(this.targets.length);
			if(player.counter + 1 < this.targets.length)
			{
				player.counter++;
				if(this.targets[player.counter] === "random")
					player.setTarget(randTarget);
				else	
					player.setTarget(this.targets[player.counter]);
			}

			if(player.start.id === this.targets[this.targets.length - 1])
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
				console.log(player.name + " выполнил " + this.name);
				this.Delete(player);
			}
		}
		if(player.curQ.priority !== 0)
		
			for(var i = 0; i < player.quests.length; i++)
			{
				if(player.quests[i].priority === 0)
				{
					player.curQ = player.quests[i];
					player.setTarget(player.quests[i].targets[player.counter]);
					break;	
				}
			}

	}
}
//локации "mainHouse", "square", "soccer", "canteen", "shop", "pool", "workshops"
//награды "XP", "money", "hp", "morale"
quests.register(new Quest("Иди в магазин и возвращайся в корпус", ["shop", "mainHouse"] , 2, false, [50, -10, 10, 20], null));
quests.register(new Quest(/*есть шанс, что бейджик потеряется в любой момент*/"Найди бейджик", ["random", "random"] , 1, false, [50, 0, 0, 20], /*бейджик*/null));
quests.register(new Quest("Найди Софью Григорьевну и иди в корпус, купи печенья", ["SG", "mainHouse"] , 2, false, [40, -5, 5, 10], null));
/*quests.register(new Quest("Сходи на завтрак", ["canteen"], 0, false, [30, 0, 20, 5], null));
quests.register(new Quest("Сходи на обед", ["canteen"], 0, false, [50, 0, 25, 5], null));
quests.register(new Quest("Сходи на полдник", ["canteen"], 0, false, [30, 0, 10, 5], null));
quests.register(new Quest("Сходи на ужин", ["canteen"], 0, false, [50, 0, 20, 5], null));
quests.register(new Quest("Сходи на второй ужин", ["canteen"], 0, false, [50, 0, 10, 5], null));*/
quests.register(new Quest(/*если не нашел бейджик*/"Найди Татьяну Ивановну и возьми бейджик", ["TI", "mainHouse"], 1, false, [20, 0, 0, -20], null));
quests.register(new Quest("Переоденься и пойди на футбольное поле, поиграй в футбол", ["mainHouse", "soccer"], 2, false, [30, 0, 10, 15/*случайное число*/], null));
quests.register(new Quest("Иди в корпус и ложись спать", ["mainHouse"], 0, false, [20, 0, 30, 30], null));
quests.register(new Quest("Выйди на зарядку", ["soccer"], 1, false, [30, 0, 10, 30], null));
quests.register(new Quest("Пропусти зарядку", ["mainHouse"], 1, false, [30, 0, 10, -30], null));
quests.register(new Quest("Выйди на линейку раньше Татьяны Ивановны", ["square"], 0, false, [20, 0, 0, 20], null));
quests.register(new Quest("Пропусти линейку", ["mainHouse"], 0, false, [20, 0, 0, -20], null));
quests.register(new Quest("Успей в мастерскую до начала занятий", ["workshops"], 1, false, [20, 0, 0, 20], null));
quests.register(new Quest("Не приходи в мастерскую, а пойди домой", ["mainHouse"], 1, false, [20, 0, 0, -20], null));
quests.register(new Quest("Успей на лекцию", ["canteen"], 1, false, [40, 0, 0, 20], null));
quests.register(new Quest("Пропусти лекцию", ["mainHouse"], 1, false, [40, 0, 0, -20], null));
quests.register(new Quest("Прочти задачу дня и реши её", ["mainHouse", "random"], 2, false, [50, 20, 0, 40], /*бейджик*/ null));
quests.register(new Quest("Возьми фотографии в мастерской и отнеси их в бильярдную", ["workshops", "pool"], 2, false, [40, 0, 0, 30], null));
//quests.register(new Quest(/*Если здоровье меньше определенного значения*/"Отправляйся в мед. пункт", ["mainHouse"], 0, true, [20, 0, 80, 10, /*случайное число*/], null));
quests.register(new Quest("Приберись в своей комнате", ["mainHouse"], 2, false, [20, 0, 0, 10], null));
quests.register(new Quest("Сходи на фильм", ["canteen"], 2, false, [20, 0, 0, 10], null));
quests.register(new Quest("Отнеси стулья из мастерской в столовую", ["workshops", "canteen"], 2, false, [50, 0, 0, 30], null));
quests.register(new Quest("Займись перепродажей вещей из магазина: сходи в магазин и продай купленые вещи в корпусе",["shop", "mainHouse"], 2, false, 
							[50, 20, 0, 20], null));//есть шанс, что кто-то заподозрит неладное, в следствие чего мораль уменьшится
quests.register(new Quest("Придумай шутку для КВН", ["random"], 2, false, [20, 0, 0, 10/*случайное число*/], null));
quests.register(new Quest("Помоги накрыть в столовой", ["canteen"], 1, false, [20, 0, 0, 15], null));
quests.register(new Quest("Поменяй свое постельное белье", ["mainHouse"], 2, false, [20, 0, 0, 15], null));
//quests.register(new Quest("Сходи в душ", ["mainHouse"], 0, false, [20, 0, 0, 10], null));
//quests.register(new Quest("Погладить кота", ["catVasya"], 0, true, [40, 0, 0, 40], null));
//quests.register(new Quest("Погладить собаку", ["dog"], 0, true, [40, 0, 0, 40], null));
quests.register(new Quest("Позвонить родителям", ["random"], 1, false, [20, 0, 0, 5], null));
quests.register(new Quest("Встреть родственников у ворот, покажи им свою комнату, проводи их до выхода", ["gate","mainHouse","gate"], 0, false, [20, 0, 20, 5], null));
//quests.register(new Quest("Оденься по погоде", ["mainHouse"], 0, true, [10, 0, 0, 10], null));
//quests.register(new Quest("Беги в корпус", ["mainHouse"], 0, true, [20, 0, 0, 20], null));

quests.register(new Quest("Отправляйся в мед. пункт", ["mainHouse"], 0, true, [20, 0, 80, 10, /*случайное число*/], null, function(player){
	return true;
}, new GDate(7), new GDate(23)));
quests.register(new Quest("Сходи в душ", ["mainHouse"], 0, false, [20, 0, 0, 10], null, function(player){
	return true;
},new GDate(7),new GDate(23));
quests.register(new Quest("Погладить кота", ["catVasya"], 0, true, [40, 0, 0, 40], null, function(player){
	var rand =  Math.floor(Math.random()*3);
	if(rand === 1){
		pers.say("Ура! Я погладил кота");
		return true;
	}
	else{
		pers.say("Не получилось. Укусил кот");
		return false;
	}
}, new GDate(7), new GDate(23), 4));
quests.register(new Quest("Погладить собаку", ["dog"], 0, true, [40, 0, 0, 40], null, function(player){
	var rand =  Math.floor(Math.random()*3);
	if(rand === 1){
		pers.say("Ура! Я погладил собаку");
		return true;
	}
	else{
		pers.say("Не получилось. Укусила собака");
		return false;
	}
}, new GDate(7), new GDate(23), 4));
quests.register(new Quest("Оденься по погоде", ["mainHouse"], 0, true, [10, 0, 0, 10], null, function(player){
	return true;
}), new GDate(7), new GDate(23), 3);
quests.register(new Quest("Беги в корпус", ["mainHouse"], 0, true, [20, 0, 0, 20], null, function(player){
	return true;
}, new GDate(7), new GDate(23)));

module.exports = quests;