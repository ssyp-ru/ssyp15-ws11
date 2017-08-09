const WALKERSCOUNT = 3;
const GREETLENGTH = 1;
var dayCount = 0;
var walkers = [];
var roads = [];
var idCount = 0;
var cities = [];

var gquest=require("./QUESTS.js");


roads.push(new Road(getCity("Магазин","shop"),getCity("Забор","gate"),30 ,"дорога" ));
roads.push(new Road(getCity("Забор","gate"),getCity("Перекресток 1","n1"),70 ,"дорога" ));
roads.push(new Road(getCity("Перекресток 1","n1"),getCity("Мастерские","workshops"),10 ,"дорога" ));
roads.push(new Road(getCity("Перекресток 1","n1"),getCity("Перекресток 2","n2"),150 ,"дорога" ));
roads.push(new Road(getCity("Перекресток 2","n2"),getCity("Столовая","canteen"),10 ,"дорога" ));
roads.push(new Road(getCity("Перекресток 2","n2"),getCity("Перекресток 3","n3"),20 ,"дорога" ));
roads.push(new Road(getCity("Перекресток 3","n3"),getCity("Бильярдная","pool"),90 ,"дорога" ));
roads.push(new Road(getCity("Перекресток 3","n3"),getCity("Линейка","square"),100 ,"дорога" ));
roads.push(new Road(getCity("Линейка","square"),getCity("Корпус","mainHouse"),20 ,"дорога" ));
roads.push(new Road(getCity("Линейка","square"),getCity("Футбольное поле","soccer"),100 ,"дорога" ));

function getCity(name,id) {
    var c=findCity(id);
    if(c)   return c;
    else return new City(name,id);

}

function logNears() {
    print("***********вывод городов и их соседей***********")
    for (var i = 0; i < cities.length; i++) {

        print(cities[i].name);
        for (var j = 0; j < cities[i].near.length; j++) {
            print("        -" + cities[i].near[j].name)
        }
    }
    print();
}
function logDay() {
    print();
    print("**********День №" + dayCount + "****************************************************************************************************");
}
function logAllWays() {
    for (var i = 0; i < cities.length; i++) {
        print("из " + cities[i].name);
        for (var j = 0; j < cities.length; j++) {
            print("       в " + cities[j].name + "  :" + cities[i].ways[cities[j].name]);

        }
        print("          ****************   ");
    }

}
function print(a) {
    if (!a) a = "";
    console.log(a);
}
function cell(l, city, way) {

    this.l = l;
    // this.pred=pred;
    this.city = city;
    this.way = way;
}
function findWay(from, to) {

    var closeList = [];
    var openList = [];
    var nextWave = [], Wave = [];
    nextWave.push(new cell(0, from, [from]));
    //console.log(nextWave);
    var way = [];
    var minLength = 100000000000000000;
    openList.push(from);
    while (nextWave.length > 0 && openList.length > 0) {
        Wave = nextWave;
        nextWave = [];
        for (var i = 0; i < Wave.length; i++) {
            for (var j = 0; j < Wave[i].city.near.length; j++) {
                var c = Wave[i].city.near[j];
                var newL = Wave[i].l + findRoad(Wave[i].city, c).length;


                if (!(closeList.contains(c))) {
                    if (c.id === to.id) {
                        if (newL < minLength) {
                            way = Wave[i].way.concat(c);
                            minLength = newL;
                        }
                    }
                    else
                        nextWave.push(new cell(newL, c, Wave[i].way.concat([c])));
                    // closeList.push(c.name);
                }

            }
            //  console.log();
            closeList.push(Wave[i].city);
        }
        //print();
        // print("*****************************след итерация");
    }
    return (way);
}

function findRoad(from, to) {
    // console.log(from+"-"+to);
    from=from.id;
    to=to.id;
    for (var i = 0; i < roads.length; i++) {
        var r = roads[i];
        if ((r.start.id === from && r.end.id === to) || (r.start.id === to && r.end.id === from)) {
            return r;
        }
    }
}

function findCity(id) {
   // console.log(id);
    for (var i = 0; i < cities.length; i++) {
       // console.log(cities[i].id);
        if (cities[i].id === id)
            return cities[i];
    }
}

function getRandomFromArray(a) {
    var i = Math.round(Math.random() * (a.length - 1));
    // console.log(i);
    return (a[i]);
}

//возвращает содержится ли в массиве переданный элемент
Array.prototype.contains = function (a) {

    for (var i = 0; i < this.length; i++) {
        if (!(typeof( a) === "string" || typeof( a) === "number" || typeof( a) === "boolean")) {
            if (this[i].equals(a)) {
                return true;
            }
        }
        else if (this[i] === a) {
            return true;
        }
    }


    //print("************************");
    return false
}
Array.prototype.last = function () {
    return this[this.length - 1];
}
City.prototype.equals = function (a) {
    return this.name === a.name;
}
//передаётся город, города с которыми он соединён дорогой
function findNearCities(a) {
    var near = [];
    for (var i = 0; i < roads.length; i++) {
        var r = roads[i];
        if (r.start.id === a.id) {
            if (!(near.contains(r.end)))
                near.push(r.end);
        }
        else if (r.end.id === a.id) {
            if (!(near.contains(r.start)))
                near.push(r.start);
        }
    }
    // a.near.concat(near);
    return near;
}

function Road(start, end, length, name) {
    this.start = start;
    this.end = end;
    this.length = length;
    this.name = name;
}

Walker.prototype.toString = function () {
    return ("Имя-" + this.name + "    Иду из-" + this.start + "  со скоростью-" + this.speed + "  прошёл-" + this.wayLength );
}

Road.prototype.equals = function (a) {
    return (a.start.equals(this.start) && a.end.equals(this.end) && a.length === this.length);

}

function Walker(name,gend) {

    this.gend=gend;
    this.money =0;
    this.end = {};
    this.speed = 10;
    this.wayL = 0;
    this.status = "";
    this.start=findCity("mainHouse");
  //  console.log(this.start);
    this.home=this.start;
    this.curQ={};
    this.gotPhone=true;
    this.road = {};
    this.quests=[];
    this.id = idCount;
    if (!name) name = "Jack";
    this.end="";
    this.name = name+this.id;
    this.target = "";
    this.targets = [];
    idCount++;
    this.lv=0;
    this.xp=0;
    this.hp=100;
    this.gotBage=true;
    this.ml=0;
    this.qc=0;
    this.items=[];
    this.curQ=null;
}

Walker.prototype.greet = function (a) {
    this.say("привет " + a.name);
}
function City(name,id) {
    this.name = name;
    this.near = [];
    this.ways = [];
    this.id=id;
    cities.push(this);
}
function walkerManager() {
    for (var i = 0; i < walkers.length; i++) {
        walkers[i].go();
    }

}
Walker.prototype.findNear = function () {
    for(var i=0;i<walkers.length;i++)
    {
        if(this.id!==walkers[i].id)
        {
            var w=walkers[i];
            //var m1,m2;
            if(((this.start+this.end)=== (w.start+ w.end))||((this.end+this.start)=== (w.start+ w.end)))
            {}
        }

    }
}

Walker.prototype.say = function (a) {


    var m="(" + this.start;
    if(this.end && this.start!==this.end) m+="-"+this.end+" "+ this.wayL;
    m+=  ")";
    print(this.name +m+" "  + ": " + a);
}
function FindWalker(a) {
    for (var i = 0; i < walkers.length; i++) {
        if (walkers[i].equals(a))
            return walkers[i];
    }
}
Walker.prototype.equals = function (a) {
    return (this.name === a.name && a.start.equals(this.start) && a.end.equals(this.end));
}
City.prototype.toString = function () {
    return this.name;
}

function getWay(from, to) {

   // console.log(from);
   // console.log(to.name);
    return from.ways[to.id];
}

Walker.prototype.go = function (a) {
//console.log("**********************"+this.name);
    if(this.targets.length>=2) {
       // console.log(this.wayL+this.speed);

        var m=this.wayL + this.speed-findRoad(this.start, this.end).length;
        if (m>=0) {
            this.wayL= 0;
            this.start = this.end;
            this.say("я прошёл ещё  "+(this.speed-m) +"и зашёл в "+this.end);

            this.end =  this.targets[this.targets.indexOf(this.start)+1];

        }
        else {
            this.wayL += this.speed;
            this.say("за сегодня мне удалось пройти "+this.speed);
        }
    }
    if(this.start===this.target) {
        this.say("я дошёл до точки назначения -"+this.target.name);
        this.reset();
    }


    if(!this.curQ)
    {
        gquest.get(this);
    }
    if(this.curQ)
    {
        this.curQ.check(this);
    }

}
Walker.prototype.addXP=function()
{}
Walker.prototype.addHp=function()
{}
Walker.prototype.reset=function() {
   // this.start="";
    this.end={};
    this.target={};
    this.targets=[];
    this.wayL=0;
}
Walker.prototype.setTarget = function (a) {

    if(typeof (a)==="string")
    a=findCity(a);

    this.target = a;
    this.say("мне нужно будет дойти до "+a.name);
    var ar=getWay(this.start, a)
    if(ar.length>0) {
        this.say("Я придумал, я пойду по пути " +ar.toString());
        this.targets = ar;
      //  console.log(this.targets);

        this.start = this.targets[0];
        this.end = this.targets[1];
        //print(this.start);
        //print(this.end);
        //print();
    }


}


function calculateCities() {
    for (var i = 0; i < roads.length; i++) {
        roads[i].start.near = findNearCities(roads[i].start);
        roads[i].end.near = findNearCities(roads[i].end);

        if (!(cities.contains(roads[i].start)))
            cities.push(roads[i].start);

        if (!(cities.contains(roads[i].end)))
            cities.push(roads[i].end);

    }

    for (var i = 0; i < cities.length; i++) {
        for (var j = 0; j < cities.length; j++) {
            cities[i].ways[cities[j].id] = findWay(cities[i], cities[j]);

        }
    }

}
calculateCities();
//logNears();

function newDay() {
    dayCount++;
    logDay();
    walkerManager();
    print();
}
walkers.push(new Walker("Vasya","m"));
//walkers[0].setTarget(cities[0]);
for(var i=0;i<100;i++)
newDay();
//console.log(gquest);
























