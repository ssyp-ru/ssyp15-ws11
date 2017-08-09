//Иван Резник и Кирилл Федосеев
//Версия - 2.0
var GDate= require("./SERVER/GDate.js");
//console.log(GDate);
//new GDate();
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
//var player = new Player();
function getBestQuest(player) {
	var gQ=[];
	var maxP=0;
	for(var c in quests.quests) {
		if(typeof (quests.quests[c])==="object")
		{
			if(quests.quests[c].priority>maxP & !quests.quests[c].npc & date.isGreater(quests.quests[c].fTime) & !date.isGreater(quests.quests[c].tTime)& player.getCofQ(quests.quests[c].name)<quests.quests[c].maxC)
			maxP=quests.quests[c].priority;
		}

	}
	//console.log("Max priroty is "+maxP);
	for(var c in quests.quests) {
		if(typeof (quests.quests[c])==="object")
		{
			if(quests.quests[c].priority===maxP & !quests.quests[c].npc & date.isGreater(quests.quests[c].fTime) & !date.isGreater(quests.quests[c].tTime)& player.getCofQ(quests.quests[c].name)<quests.quests[c].maxC)
			{
				gQ.push(quests.quests[c]);
			}
		}

	}

	return gQ[Math.floor(Math.random()*gQ.length)];
}
function GQuest() {
	this.quests = [];
	this.register = function(quest) {
		this.quests.push(quest);
	};
	this.get = function(player,quest) {
		//console.log(date.getHours());
		if(date.getHours()<=23 && date.getHours()>=7) {
			var q;
			//console.log("here");
			if (!quest) {
				q = getBestQuest(player);
			}
			else {
				q = getQbyName(quest);
			}

			var questCopy = deepCopy(q);
			player.curQ = questCopy;
			player.counter = 0;
			//console.log("выдал квест-"+ player.curQ.name);
			if (questCopy.targets[player.counter] === "random")
				player.curQ.targets[player.counter] = randTarget(player.start.name);

			player.setTarget(questCopy.targets[player.counter]);
		}
		else if(player.start.id!=="mainHouse"){
			var q=getQbyName("бегом в Корпус");
			var questCopy = deepCopy(q);
			player.curQ = questCopy;
			player.counter = 0;
			//console.log("выдал квест-"+ player.curQ.name);
			if (questCopy.targets[player.counter] === "random")
				player.curQ.targets[player.counter] = randTarget(player.start.name);
			player.setTarget(questCopy.targets[player.counter]);
		}

	}
}
var quests = new GQuest();
function getQbyName(name) {
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
function randTarget(a) {
	var m=locations[Math.floor(Math.random()*locations.length)];
	while(m===a)
		m=locations[Math.floor(Math.random()*locations.length)];
	//console.log(m);
	return m;
}
function Quest(name, targets, priority, npc, rewards, item,callback,fTime,tTime,maxC) {
	this.fTime=fTime;
	this.tTime=tTime;
	this.name = name;
	this.priority = priority;
	this.npc = npc;
	this.rewards = rewards;//["XP", "money", "hp", "morale"]
	this.item = item;
	this.targets = targets;
	this.callback=callback;
	this.maxC=maxC;
	if(!maxC)
	this.maxC=2/0;
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
	this.check = function(player) {

		if(date.isGreater(this.tTime) || !date.isGreater(this.fTime))
		{
			console.log("вылетело на времени");
			player.reset();
			return;
		}

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
				console.log("вызвал callback");
				if(callback(player)) {

					player.qc++;
					player.addXP(rewards[0]);
					player.money += rewards[1];
					player.addHp(rewards[2]);
					player.ml += rewards[3];
					//player.counter=0;
					console.log("квест выполнен");
					player.addCompQ(player.curQ.name);
					if (item !== null) {
						player.addItem(item);
					}
				}
				player.curQ.Delete(player);
			}
		}

	}
}
Quest.prototype.toString=function() {
	return this.name;
}
quests.register(new Quest("Иди в магазин, потом иди в корпус", ["shop", "shop","canteen","shop","mainHouse"] , 0, false, [50, -10, 10, 20], null,function(player){
return true;
}, new GDate(7)  ,new GDate(23) ));
quests.register(new Quest("Найди бэйджик", ["square","square"] , 0, false, [50, 0, 0, 20], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Найди Софью Григорьевну и иди в корпус купи печенья]", ["random", "mainHouse"] , 0, false, [40, -5, 5, 10], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Иди в магазин и возвращайся в корпус", ["shop", "mainHouse"] , 0, false, [50, -10, 10, 20], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Найди бэйджик", ["random", "random"] , 0, false, [50, 0, 0, 20], /*бейджик*/null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Найди Софью Григорьевну и иди в корпус, купи печенья", ["random", "mainHouse"] , 0, false, [40, -5, 5, 10], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Сходи на завтрак", ["canteen"], 0, false, [30, 0, 20, 5], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Сходи на обед", ["canteen"], 0, false, [50, 0, 25, 5], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Сходи на полдник", ["canteen"], 0, false, [30, 0, 10, 5], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Сходи на ужин", ["canteen"], 0, false, [50, 0, 20, 5], null,function(player){
	return true;
},new GDate(7),new GDate(23),1));
quests.register(new Quest("Сходи на второй ужин", ["canteen"], 0, false, [50, 0, 10, 5], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Найди Татьяну Ивановну и возьми бейджик", ["random", "mainHouse"], 0, false, [20, 0, 0, -20], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Переоденься и пойди на футбольное поле, поиграй в футбол", ["mainHouse", "soccer"], 0, false, [30, 0, 10, 15/*случайное число*/], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Иди в корпус и ложись спать", ["mainHouse"], 0, false, [20, 0, 30, 30], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Выйди на зарядку", ["soccer"], 0, false, [30, 0, 10, 30], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Пропусти зарядку", ["mainHouse"], 0, false, [30, 0, 10, -30], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Выйди на линейку раньше Татьяны Ивановны", ["square"], 0, false, [20, 0, 0, 20], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Пропусти линейку", ["mainHouse"], 0, false, [20, 0, 0, -20], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Успей в мастерскую до начала занятий", ["workshops"], 0, false, [20, 0, 0, 20], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Опоздай в мастерскую", ["workshops"], 0, false, [20, 0, 0, -20], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Успей на лекцию", ["canteen"], 0, false, [40, 0, 0, 20], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Пропусти лекцию", ["mainHouse"], 0, false, [40, 0, 0, -20], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Прочти задачу дня и реши её", ["mainHouse", "random"], 0, false, [50, 20, 0, 40], /*бейджик*/ null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest(/*Если встретил Татьяну Ивановну*/"Поздоровайся с Татьяной Ивановной", ["random"], 0, false, [10, 0, 0, 30], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Возьми фотографии в мастерской и отнеси их в бильярдную", ["workshops", "pool"], 0, false, [40, 0, 0, 30], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest(/*Если здоровье меньше определенного значения*/"Отправляйся в мед. пункт", ["mainHouse"], 0, false, [20, 0, 80,0 /*случайное число*/], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Приберись в своей комнате", ["mainHouse"], 0, false, [20, 0, 0, 10], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Сходи на фильм", ["canteen"], 0, false, [20, 0, 0, 10], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Отнеси стулья из мастерской в столовую", ["workshops", "canteen"], 0, false, [50, 0, 0, 30], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Займись перепродажей вещей из магазина: сходи в магазин и продай купленые вещи в корпусе",["shop", "mainHouse"], 0, false,
	[50, 20, 0, 20], null,function(player){
		return true;
	},new GDate(7),new GDate(23)));//есть шанс, что кто-то заподозрит неладное, в следствие чего мораль уменьшится
quests.register(new Quest("Придумай шутку для КВН", ["random"], 0, false, [20, 0, 0, 10/*случайное число*/], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Помоги накрыть в столовой", ["canteen"], 0, false, [20, 0, 0, 15], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Поменяй свое постельное белье", ["mainHouse"], 0, false, [20, 0, 0, 15], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Сходи в душ", ["mainHouse"], 0, false, [20, 0, 0, 10], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Позвонить родителям", ["random"], 0, false, [20, 0, 0, 5], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Погладить кота", ["random"], 0, false, [40, 0, 0, 40], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Встреть родственников у ворот", ["gate"], 0, false, [20, 0, 20, 5], null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Иди оденься по погоде",["mainHouse"],3,true,[0,0,0,0],null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Иди помойся,маня",["mainHouse"],3,true,[0,0,0,0],null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("бегом в Корпус",["mainHouse"],3,true,[0,0,0,0],null,function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Отправляйся в мед. пункт", ["mainHouse"], 0, true, [20, 0, 80, 10, /*случайное число*/], null, function(player){
	return true;
}, new GDate(7), new GDate(23)));
quests.register(new Quest("Сходи в душ", ["mainHouse"], 0, false, [20, 0, 0, 10], null, function(player){
	return true;
},new GDate(7),new GDate(23)));
quests.register(new Quest("Погладить кота", ["mainHouse"], 0, true, [40, 0, 0, 40], null, function(player){
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
quests.register(new Quest("Погладить собаку", ["mainHouse"], 0, true, [40, 0, 0, 40], null, function(player){
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
}, new GDate(7), new GDate(23), 3));
quests.register(new Quest("Беги в корпус", ["mainHouse"], 0, true, [20, 0, 0, 20], null, function(player){
	return true;
}, new GDate(7), new GDate(23)));


module.exports.quests = quests;
exports.getQbyName=getQbyName;