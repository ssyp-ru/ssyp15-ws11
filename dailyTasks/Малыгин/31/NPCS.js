const WALKERS = require("./WALKERS");
const CITIES = require("./CITIES");
const ROADS = require("./ROADS");
const QUEST=require("./QUESTS");
var npcs = [];
function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
Npc.prototype = new WALKERS.Walker();
function Npc(name, gend, id, lv, ml, cities,quests,greetF) {
    WALKERS.Walker.call(this, name, gend, id);
    this.npc=true;
    this.lv = lv;
    this.ml = ml;
    this.greetF=greetF;
    this.meetC = [];
    this.quests=quests;
    if (cities === "all") {
        for (var i in CITIES.cities) {
            if (typeof (CITIES.cities[i]) === "object") {
                this.meetC.push(CITIES.cities[i]);
            }
        }
    }
    else
        for (var i in cities) {
            if (typeof (cities[i]) === "string") {
                this.meetC.push(CITIES.findCity(cities[i]));
            }
        }

}
//var t=new Npc("Татьяна Ивановна","f",666,100,1000,"all");
//console.log(t);
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
Npc.prototype.go = function (a) {
    if (this.end === null) {
        this.setTarget(getRandomFromArray(this.meetC));
        //console

    }

    if (this.start.name === this.target.name) {
       // this.say("я дошёл до точки назначения -" + this.target.name);
        this.reset();

    }
    // console.log("length"+this.targets.length)
    if (this.targets.length >= 2) {
        // console.log(this.targets.toString());
        var m = this.wayL + this.speed - ROADS.findRoad(this.start, this.end).length;
        if (m >= 0) {
            this.wayL = 0;
            this.start = this.end;
            //this.say("я прошёл ещё  " + (this.speed - m) + " и зашёл в " + this.end);

            this.end = this.targets[this.targets.indexOf(this.start) + 1];

        }
        else {
            this.wayL += this.speed;
           // this.say("за сегодня мне удалось пройти " + this.speed);
        }
    }
    this.findNear();

};
module.exports.Npc = Npc;
//Татьяна Ивановна
var TI = new Npc("green", "Татьяна Ивановна", "f", 666, 100, 1000, "all",["Оденься по погоде","Сходи в душ"],function(pers){
    pers.say("Я встретил татьяну ивановну");
    pers.say("ДОБРОЕ УТРО ТАТЬЯНА ИВАНОВНА");
    pers.say("Татьяна Ивановна прервала моё задание " );
    pers.reset();
	var rand = Math.floor(Math.random()*5);
	if(rand === 1){
		var q=this.quests[q.indexOf("Оденься по погоде")];
		pers.say("Татьяна Ивановна выдала мне задание "+q);
		QUEST.quests.get(pers,q);
	}
	if(rand === 4){
		var q=this.quests[q.indexOf("Сходи в душ")];
		pers.say("Татьяна Ивановна выдала мне задание "+q);
		QUEST.quests.get(pers,q);	
	}
});

var Dultsev = new Npc("black", "Дульцев", "m", 777, 100, -1000,["workshops", "canteen", "mainHouse", "square"], ["Сходи в душ"], function(pers){
	pers.say("Я встретил Дульцева");
	var rand = Math.floor(Math.random()*2);
	if(rand === 1){
		pers.say("<h1>Дульцев облил меня кофе</h1>");
		pers.say("Дульцев прервал мое задание ");
		pers.reset();
		pers.ml -= 20;
		var q=this.quests[q.indexOf("Сходи в душ")];
		pers.say("Дульцев выдал мне задание "+q);
		QUEST.quests.get(pers,q);
	}
	else{
		pers.say("<h1>Дульцев отобрал у меня деньги</h1>");
		pers.ml -= 10;
		pers.coins -= 5;
	}
});

var SG = new Npc("magento", "Софья Григорьевна", "f", 901, 100, 0, ["canteen", "mainHouse", "square"], [], function(pers){
	pers.say("Я встретил Софью Григорьевну");
	pers.say("Здравствуйте, Софья Григорьевна");
});

var catVasya = new Npc("#257c3d", "Кот Василий", "m", 902, 100, 0, "all", ["Погладить кота"], function(pers){
	pers.say("Я встретил Кота Василия");
	pers.say("Кот Василий прервал мое задание ");
	pers.reset();
	var q=this.quests[q.indexOf("Погладить кота")];
	pers.say("Кот Василий выдал мне задание "+q);
    QUEST.quests.get(pers,q);
})

var dog = new Npc("#06fce9", "Собака", "m", 903, 100, 0, "all", ["Погладить собаку"], function(pers){
	pers.say("Я встретил Собаку");
	pers.say("Собака прервала мое задание ");
	pers.reset();
	var q=this.quests[q.indexOf("Погладить собаку")];
	pers.say("Собака выдала мне задание "+q);
    QUEST.quests.get(pers,q);
})

var Redko = new Npc("blue", "Редько", "f", 904, 100, 0, "all", ["Переоденься и пойди на футбольное поле, поиграй в футбол"], function(pers){
	Redko.speed = 25;
	pers.say("Я встретил Редько");
	pers.say("Привет, Серёжа!");
	var q=this.quests[q.indexOf("Переоденься и пойди на футбольное поле, поиграй в футбол")];
	pers.say("Редько выдал мне задание "+q);
    QUEST.quests.get(pers,q);
})

var IV = new Npc("orange", "Ирина Викторовна", 905, 100, 0, "all", ["Отнеси стулья из мастерской в столовую"], function(pers){
	pers.say("Я встретил Ирину Викторовну");
	pers.say("Здравствуйте, Иринa Викторовнa");
	var q=this.quests[q.indexOf("Отнеси стулья из мастерской в столовую")];
	pers.say("Татьяна Николаевна выдала мне задание "+q);
	QUEST.quests.get(pers,q);
});

var TN = new Npc("pink", "Татьяна Николаевна", 906, 100, 0, "all", ["Оденься по погоде","Отправляйся в мед. пункт"], function(pers){
	pers.say("Я встретил Татьяну Николаевну");
	pers.say("Здравствуйте, Татьяну Николаевну");
	if(pers.hp<30){
		pers.say("Татьяна Николаевна прервала мое задание ");
		pers.reset();
		var q=this.quests[q.indexOf("Отправляйся в мед. пункт")];
		pers.say("Татьяна Николаевна выдала мне задание "+q);
		QUEST.quests.get(pers,q);
	}
	var rand = Math.floor(Math.random()*4);
	if(rand === 1){
		var q=this.quests[q.indexOf("Оденься по погоде")];
		pers.say("Татьяна Николаевна выдала мне задание "+q);
		QUEST.quests.get(pers,q);
	}
});

var bear = new Npc("brown", "Медведь", 907, 100, 500, 0, "all", ["Беги в корпус"], function(pers){
	bear.speed = 8;
	pers.say("Я встретил Медведя");
	pers.say("Здравствуйте, Медведя");
	pers.reset();
	var q=this.quests[q.indexOf("Беги в корпус")];
	pers.say("Медведь выдал мне задание "+q);
	QUEST.quests.get(pers,q);
});

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


npcs.push(TI);
npcs.push(Dultsev);
npcs.push(SG);
npcs.push(catVasya);
npcs.push(dog);
npcs.push(Redko);
npcs.push(IV);
npcs.push(TN);
npcs.push(bear);

function onRoad(a1,a2) {
    if(typeof(a1)==="object"&&typeof(a2)==="object" )
    {
       // console.log(a1.start);
        var w=a2;
        var ar1=[],ar2=[];
        var s1,s2,e1,e2;
        s1=a1.start.name;
        ar1.push(s1);
        try {
            e1 = a1.start.name;
            ar1.push(e1);
        }
        catch(e)
        {
            e1=s1;
        }
        s2= w.start.name;
        ar2.push(s2);
        try {
            e2 = w.end.name;
            ar2.push(e2);

        }
        catch(e)
        {
            e2=s2;
        }

        if(ar1.length<ar2.length)
        {
            var c=deepCopy(ar1);
            ar1=deepCopy(ar2);
            ar2=c;
        }
        var meet=true;
        for(var i in ar2)
        {
            if(typeof (ar2[i])==="string")
                if(ar1.indexOf(ar2[i])===-1)
                {
                    meet=false;
                    break;
                }
        }
return meet;


    }

}
Npc.prototype.findNear = function () {
    for (var i in WALKERS.walkers) {
        if(typeof (WALKERS.walkers)==="object")
        {
            if(onRoad(this,WALKERS.walkers[i]))
            {
                this.greetF(WALKERS.walkers[i]);
            }


        }

    }
};

module.exports.npcs=npcs;
