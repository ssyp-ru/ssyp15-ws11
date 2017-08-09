const WALKERS = require("./WALKERS");
const CITIES = require("./CITIES");
const ROADS = require("./ROADS");
const QUEST=require("./QUESTS");
var npcs = [];
function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
Npc.prototype = new WALKERS.Walker();
function Npc(colorI,name, gend, id, lv, ml, cities,quests,greetF) {
    WALKERS.Walker.call(this, name, gend, id);
    this.colorI=colorI;
    this.npc=true;
    this.lv = lv;
    this.ml = ml;
    this.greetF=greetF;
    this.meetC = [];
    this.quests=quests;
    if (cities === "all") {
        for (var i in CITIES.cities) {
            if (typeof (CITIES.cities[i]) === "object") {
                this.meetC.push(CITIES.cities[i].name);
            }
        }
    }
    else
        for (var i in cities) {
            if (typeof (cities[i]) === "string") {
                this.meetC.push(CITIES.findCity(cities[i]));
            }
        }
    console.log(this.meetC);
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
Npc.prototype.go = function (a) {
    if (this.end === null) {
        console.log(this.meetC);
        this.setTarget(getRandomFromArray(this.meetC));

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
var TI = new Npc("Татьяна Ивановна", "f", 666, 100, 1000, "all",["Иди оденься по погоде","Иди помойся,маня"],function(pers){
    pers.say("Я встретил татьяну ивановну");
    pers.say("ДОБРОЕ УТРО ТАТЬЯНА ИВАНОВНА");
   // console.log(pers);
    pers.say("Татьяна ивановна прервала моё задание " );
    pers.reset();
    var q=this.quests[Math.floor(Math.random()*this.quests.length)];
    pers.say("Татьяна Ивановна выдала мне задание "+q);
    QUEST.quests.get(pers,q);

});
npcs.push(TI);
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
function npcLite(start,end,wayL,colorI) {
    this.start=start;
    this.end=end;
    this.wayL=wayL;
    this.colorI=colorI;
}
function getNpcsForD() {
var str="";
   var npC=[];
for(var i in npcs)
{
    if(typeof (npcs[i])==="object")
    {
        var end ;
        try {
            end=npcs[i].end.name;
        }
        catch(e) {
            end="null";
        }
        npC.push(new npcLite(npcs[i].start.name,end,npcs[i].wayL,npcs[i].colorI));
    }
}
str=JSON.stringify( npC);
 return str;
};

//console.log(getNpcsForD());
module.exports.getFN=getNpcsForD;
module.exports.npcs=npcs;
