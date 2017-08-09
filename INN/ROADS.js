CITY=require("./CITIES");
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
var roads=[];
//console.log(roads);
var Road= function (start, end, length, name) {
    this.start = start;
    this.end = end;
    this.length = length;
    this.name = name;
}
Road.prototype.equals = function (a) {
    return (a.start.equals(this.start) && a.end.equals(this.end) && a.length === this.length);

}
function cell(l, city, way) {

    this.l = l;
    // this.pred=pred;
    this.city = city;
    this.way = way;
}
function calculateCities() {
    for (var i = 0; i < roads.length; i++) {
        roads[i].start.near = findNearCities(roads[i].start);
        roads[i].end.near = findNearCities(roads[i].end);

        if (!(CITY.cities.contains(roads[i].start)))
            CITY.cities.push(roads[i].start);

        if (!(CITY.cities.contains(roads[i].end)))
            CITY.cities.push(roads[i].end);

    }

    for (var i = 0; i < CITY.cities.length; i++) {
        for (var j = 0; j < CITY.cities.length; j++) {
            CITY.cities[i].ways[CITY.cities[j].id] = findWay(CITY.cities[i], CITY.cities[j]);
           // console.log(CITY.cities[i]);
        }
    }

}
roads.push(new Road(CITY.getCity("Магазин","shop"),CITY.getCity("Забор","gate"),30 ,"дорога" ));
roads.push(new Road(CITY.getCity("Забор","gate"),CITY.getCity("Перекресток 1","n1"),70 ,"дорога" ));
roads.push(new Road(CITY.getCity("Перекресток 1","n1"),CITY.getCity("Мастерские","workshops"),10 ,"дорога" ));
roads.push(new Road(CITY.getCity("Перекресток 1","n1"),CITY.getCity("Перекресток 2","n2"),150 ,"дорога" ));
roads.push(new Road(CITY.getCity("Перекресток 2","n2"),CITY.getCity("Столовая","canteen"),10 ,"дорога" ));
roads.push(new Road(CITY.getCity("Перекресток 2","n2"),CITY.getCity("Перекресток 3","n3"),20 ,"дорога" ));
roads.push(new Road(CITY.getCity("Перекресток 3","n3"),CITY.getCity("Бильярдная","pool"),90 ,"дорога" ));
roads.push(new Road(CITY.getCity("Перекресток 3","n3"),CITY.getCity("Линейка","square"),100 ,"дорога" ));
roads.push(new Road(CITY.getCity("Линейка","square"),CITY.getCity("Корпус","mainHouse"),20 ,"дорога" ));
roads.push(new Road(CITY.getCity("Линейка","square"),CITY.getCity("Футбольное поле","soccer"),100 ,"дорога" ));
var findRoad=    function (from, to) {
   //0 console.log(from+"-"+to);
    //console.log(to.id);
    if(typeof(from)==="object")
    from=from.id;
    if(typeof(to)==="object")
    to=to.id;
    for (var i = 0; i < roads.length; i++) {
        var r = roads[i];
        if ((r.start.id === from && r.end.id === to) || (r.start.id === to && r.end.id === from)) {
            return r;
        }
    }
}
function findWay(from, to) {

    var closeList = [];
    var openList = [];
    var nextWave = [], Wave = [];
    nextWave.push(new cell(0, from, [from]));
    //console.log(nextWave);
    var way = [];
    var minLength = 2/0;
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
    //console.log();
  //  console.log(way);
    return (way);
}
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
calculateCities();
function logAllWays() {
    for (var i = 0; i < CITY.cities.length; i++) {
        console.log("из " + CITY.cities[i].name);
        for (var j = 0; j < CITY.cities.length; j++) {

            console.log("       в " + CITY.cities[j].name + "  :" + CITY.cities[i].ways[CITY.cities[j].id]);

        }
        console.log("          ****************   ");
    }

}
function logNears() {
    //print("***********вывод городов и их соседей***********")
    for (var i = 0; i < CITY.cities.length; i++) {

        console.log(CITY.cities[i].name);
        for (var j = 0; j < CITY.cities[i].near.length; j++) {
            console.log("        -" + CITY.cities[i].near[j].name)
        }
    }
    console.log();
}
//logAllWays();
//logNears();
//console.log(CITY.findCity("square"));
module.exports.findRoad=findRoad;
module.exports.roads=roads;
//module.exports.Road=Road;