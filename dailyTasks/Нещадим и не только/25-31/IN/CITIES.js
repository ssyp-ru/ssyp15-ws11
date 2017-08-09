var City= function (name,id) {
    this.name = name;
    this.near = [];
    this.ways = [];
    this.id=id;
//    cities.push(this);
}
var findCity= function (txt) {

    for (var i = 0; i < cities.length; i++) {
        if (cities[i].id === txt || cities[i].name===txt)
            return cities[i];
    }
    if(txt==="null")
        return null;
}
var getCity=function (name,id) {
    var c=findCity(id);
    if(c)   return c;
    else return new City(name,id);

}
City.prototype.equals = function (a) {
    return this.name === a.name;
}
City.prototype.toString = function () {
    return this.name;
}
cities=[];
//cities.push(new City("name","n"));
var getWay= function (from, to) {

   // console.log(from);
    // console.log(from.name);
     //console.log(to.name);
    return findCity(from.name).ways[to.id];
}

//module.exports.City=City;
module.exports.getWay=getWay;
module.exports.findCity=findCity;
module.exports.cities=cities;
module.exports.getCity=getCity;