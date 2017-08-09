const WALKERS = require("./WALKERS");
const CITIES = require("./CITIES");
const ROADS = require("./ROADS");
const QUEST = require("./QUESTS");

var npcs = [];

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
Npc.prototype = new WALKERS.Walker();
function Npc(colorI, name, gend, id, lv, ml, cities, quests, greetF) {
    WALKERS.Walker.call(this, name, gend, id);
    this.colorI = colorI;
    this.npc = true;
    this.lv = lv;
    this.ml = ml;
    this.greetF = greetF;
    this.meetC = [];
    this.quests = quests;
    // console.log(CITIES.cities);
    if (cities === "all") {
        for (var i in CITIES.cities) {
            if (typeof (CITIES.cities[i]) === "object") {
                //  console.log(CITIES.cities[i]);
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
//console.log(this.meetC);
}
deepCopy = function (o) {
    var copy = o, k;

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
        //console.log(this.meetC);

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
var TI = new Npc("ti", "Татьяна Ивановна", "f", 666, 100, 1000, "all", ["Иди оденься по погоде", "Иди помойся,маня"], function (pers) {

    pers.say("Я встретил татьяну ивановну");
    pers.say("ДОБРОЕ УТРО ТАТЬЯНА ИВАНОВНА");
    pers.ml+=20;
    if ((Math.random()) < 0.1) {
        pers.say("Татьяна ивановна прервала моё задание ");
        pers.reset();
        var q = this.quests[Math.floor(Math.random() * this.quests.length)];
        pers.say("Татьяна Ивановна выдала мне задание " + q);
        pers.say("Наверное она права");
        QUEST.quests.get(pers, q);
    }
});
TI.speed=9;
var Dultsev = new Npc("dv", "Дульцев", "m", 777, 100, -1000, ["workshops", "canteen", "mainHouse", "square"], ["Сходи в душ"], function (pers) {
    pers.say("Я встретил ДУЛЬЦЕВА");
    if ((Math.random()) < 0.2) {
    var rand = Math.floor(Math.random() * 2);
    if (rand === 1) {
        pers.say("<h1>Дульцев облил меня кофе</h1>");
        pers.say("Дульцев ошарашил меня своим появлением, и я не смог больше выполнять текущее задание ");
        pers.reset();
        pers.ml -= 10;
        var q = "Сходи в душ";
        pers.say("От меня так дико пасло, что Дульцев отправил меня мыться");
        QUEST.quests.get(pers, q);
    }
    else {
        pers.say("<h1>Дульцев отобрал у меня деньги</h1>");
        pers.ml -= 5;
        pers.coins -= 10;
    }
    }
});
var SG = new Npc("sg", "Софья Григорьевна", "f", 901, 100, 0, ["canteen", "mainHouse", "square"], [], function (pers) {
    pers.say("Я встретил Софью Григорьевну");
    pers.say("Здравствуйте, Софья Григорьевна");
    pers.say("Она рассказала офигительную историю про то, как дети травились лимонадом")
    pers.ml+=5;
});
var catVasya = new Npc("cat", "Кот Василий", "m", 902, 100, 0, "all", ["Погладить кота"], function (pers) {
    pers.say("Я встретил Кота Василия");
    if ((Math.random()) < 0.3) {
        pers.say("Кот Василий мило мяукал, и я решил его погладить");
        pers.reset();
        var q = "Погладить кота";
        pers.say("Ну я, конечно же, забил на своё старое задание");
        QUEST.quests.get(pers, q);
    }});
catVasya.speed=15;
var dog = new Npc("dog", "Собака", "m", 903, 100, 0, "all", ["Погладить собаку"], function (pers) {
    pers.say("Я встретил Собаку");
    if ((Math.random()) < 0.3) {
        pers.say("Я увидел собаку и забил на своё старое задание ");
        pers.reset();
        var q = "Погладить собаку";
        pers.say("Я решил погладить собаку");
        QUEST.quests.get(pers, q);
    }});
dog.speed=15;
var Redko = new Npc("rd", "Редько", "f", 904, 100, 0, "all", ["Переоденься и пойди на футбольное поле, поиграй в футбол"], function (pers) {
    pers.ml-=5;
    pers.say("Я встретил Редько");
    if ((Math.random()) < 0.4) {
    pers.say("Я заорал:' Редько, отвали!',но благодаря своей упёртости ");
    var q = "Переоденься и пойди на футбольное поле, поиграй в футбол";
    pers.say("Редько выдал мне задание " + q);
    QUEST.quests.get(pers, q);
}});
Redko.speed = 15;
var IV = new Npc("iv", "Ирина Викторовна", "f", 905, 100, 0, "all", ["Отнеси стулья из мастерской в столовую"], function (pers) {
    pers.say("Я встретил Ирину Викторовну");
    pers.say("Здравствуйте, Иринa Викторовнa");
    if ((Math.random()) < 0.2) {
    var q = "Отнеси стулья из мастерской в столовую";
    pers.say("Ирина Викторовна выдала мне задание " + q);
    QUEST.quests.get(pers, q);
}});
var TN = new Npc("tn", "Татьяна Николаевна", "f", 906, 100, 0, "all", ["Оденься по погоде", "Отправляйся в мед. пункт"], function (pers) {
    pers.say("Я встретил Татьяну Николаевну");
    pers.say("Здравствуйте, Татьяна Николаевна");
    pers.addHp(10);
    if (pers.hp < 30) {
        pers.say("Татьяна Николаевна прервала мое задание ");
        pers.reset();
        var q = "Отправляйся в мед. пункт";
        pers.say("Татьяна Николаевна выдала мне задание " + q);
        QUEST.quests.get(pers, q);
    }
    var rand = Math.floor(Math.random() * 4);
    if (rand === 1) {
        var q = "Оденься по погоде";
        pers.say("Татьяна Николаевна выдала мне задание " + q);
        QUEST.quests.get(pers, q);
    }
});
var bear = new Npc("bear", "Медведь", "m", 907, 100, 500, "all", ["Беги в корпус"], function (pers) {

    pers.say("Я встретил Медведя");
   //pers.say("АРТЁМ УРОД ЗАПОРОЛ КОД И  ЭТОГО В ЛОГЕ НИКТО НЕ НАЙДЁТ, НО СЕРЁЖА ПРИДЁТ И ИСПРАВИТ ВЕСЬ КОД");
    pers.reset();
    var q = "Беги в корпус";
    pers.say("Медведь напугал меня досмерти, и я побежал в корпус");
    QUEST.quests.get(pers, q);
});
bear.speed = 8;

npcs.push(TI);
npcs.push(Dultsev);
npcs.push(SG);
npcs.push(catVasya);
npcs.push(dog);
npcs.push(Redko);
npcs.push(IV);
npcs.push(TN);
npcs.push(bear);

function onRoad(a1, a2) {
    if (typeof(a1) === "object" && typeof(a2) === "object") {
        // console.log(a1.start);
        var w = a2;
        var ar1 = [], ar2 = [];
        var s1, s2, e1, e2;
        s1 = a1.start.id;
        ar1.push(s1);
        try {
            e1 = a1.end.id;
            ar1.push(e1);
        }
        catch (e) {
            e1 = s1;
        }
        s2 = w.start.id;
        ar2.push(s2);
        try {
            e2 = w.end.id;
            ar2.push(e2);

        }
        catch (e) {
            e2 = s2;
        }
        var meet = true;
        //  if(ar1.length<ar2.length) {
        //   var c=deepCopy(ar1);
        //  ar1=deepCopy(ar2);
        // ar2=c;
        // }
        //var meet=true;
        //for(var i in ar2)
        //{
        //  if(typeof (ar2[i])==="string")
        //    if(ar1.indexOf(ar2[i])===-1)
        //  {
        //    meet=false;
        //    break;
        //}
        // }
        if(ar1.length!==ar2.length) {
            return false;
        }

        for (var i in ar2) {
            if (typeof (ar2[i]) === "string")
                if (ar1.indexOf(ar2[i]) === -1) {
                    return false;
                }
        }
        if(ar1.length===1)
        {
            return true;
        }

        var l1=0,l2=0;
        if(meet)
        {
            //console.log(ar1);
            //console.log(ar2);
            var r=ROADS.findRoad(ar1[0],ar1[1]);
           // console.log(r);
            l1=a1.wayL;
            l2=a2.wayL;
            if(l1===l2 ||l1===r.length-l2)
            return true;
        }
        return false;


    }

}
Npc.prototype.findNear = function () {

    for (var i in WALKERS.walkers) {
        if (typeof (WALKERS.walkers[i]) === "object") {
            // console.log(WALKERS.walkers[i].name);
            if (onRoad(this, WALKERS.walkers[i])) {

                this.greetF(WALKERS.walkers[i]);
            }


        }

    }
};
function npcLite(start, end, wayL, colorI) {
    this.start = start;
    this.end = end;
    this.wayL = wayL;
    this.colorI = colorI;
}
function getNpcsForD() {
    var str = "";
    var npC = [];
    for (var i in npcs) {
        if (typeof (npcs[i]) === "object") {
            var end;
            try {
                end = npcs[i].end.name;
            }
            catch (e) {
                end = "null";
            }
            npC.push(new npcLite(npcs[i].start.name, end, npcs[i].wayL, npcs[i].colorI));
        }
    }
    str = JSON.stringify(npC);
    return str;
};

//console.log(getNpcsForD());
module.exports.getFN = getNpcsForD;
module.exports.npcs = npcs;
