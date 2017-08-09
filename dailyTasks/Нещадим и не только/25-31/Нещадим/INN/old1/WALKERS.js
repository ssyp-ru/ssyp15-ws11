const CITY=require("./CITIES");
const ROADS=require("./ROADS");
const GQUEST=require("./QUESTS.js");
const GLOG=require("./GLog.js");
//const WALK=require("./SERVER/walkers.json");
const fs=require("fs");
var walkers=[];
var Walker= function (name,gend,id) {
    this.counter=0;
    this.gend=gend;
    this.money =0;
    this.end = null;
    this.speed = 10;
    this.wayL = 0;
    this.status = "";
    this.start=CITY.findCity("mainHouse");
    //  console.log(this.start);
    this.home=this.start;
    this.curQ={};
    this.gotPhone=true;
    this.road = null;
    this.quests=[];
    this.id = id;
    this.end=null;
    if (!name)
        name = "Jack";
    else
    this.name = name;
    this.target = null;
    this.targets = [];
    this.lv=0;
    this.xp=0;
    this.hp=100;
    this.gotBage=true;
    this.ml=0;
    this.qc=0;
    this.items=[];
    this.curQ=null;
    this.log=new GLOG.Glog();
};
var createWalker=function(name,gend,id) {
   // console.log(name+" "+gend);
    var c=new Walker(name,gend,id);
    walkers[id]=c;
    saveWalkers();

};
Walker.prototype.getI=function(name) {
    loadWalkers();
    return this[name];
};
Walker.prototype.greet = function (a) {
    this.say("привет " + a.name);
}
Walker.prototype.findNear = function () {
    for(var i=0;i<walkers.length;i++)
    {
        if(this!==walkers[i])
       if(ROADS.findRoad(this.start,this.end).equals(ROADS.findRoad(walkers[i].start,walkers[i].end)))
            this.greet(walkers[i]);

    }
}
Walker.prototype.say = function (a) {


    var m="(" + this.start;
    if(this.end && this.start!==this.end) m+="-"+this.end+" "+ this.wayL;
    m+=  ")";
    this.log.add(this.name +m+" "  + ": " + a);
}
Walker.prototype.equals = function (a) {
  //  if(a.end && this.end)
  //  console.log(typeof (a.end));
    if(a.end&& this.end) {
        return (this.name === a.name && a.start.equals(this.start) && a.end.equals(this.end));
    }
    else
    if(!a.end&& !this.end) {

        return (this.name === a.name && a.start.equals(this.start));
    }
    else
    return false
}
Walker.prototype.go = function (a) {
   // console.log("length"+this.targets.length)
    if(this.targets.length>=2) {
        var m=this.wayL + this.speed-ROADS.findRoad(this.start, this.end).length;
        if (m>=0) {
            this.wayL= 0;
            this.start = this.end;
            this.say("я прошёл ещё  "+(this.speed-m) +" и зашёл в "+this.end);

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
    if(!this.target && this.curQ)
    {
        GQUEST.quests.get(this);
    }


    if(!this.curQ)
    {
        GQUEST.quests.get(this);
    }
    if(this.curQ)
    {
       // console.log(this.curQ);
        this.curQ.check(this);
    }

}
Walker.prototype.addXP=function() {}
Walker.prototype.addHp=function() {}
Walker.prototype.reset=function() {
    // this.start="";
    this.end=null;
    this.target={};
    this.targets=[];
    this.wayL=0;
}
Walker.prototype.setTarget = function (a) {

    if(typeof (a)==="string")
        a=CITY.findCity(a);
   // console.log(this.start);
    this.target = a;
    this.say("мне нужно будет дойти до "+a.name);
    var ar=CITY.getWay(this.start, a);
    //console.log(ar);
    if(ar.length>0) {
        this.say("Я придумал, я пойду по пути " +ar.toString());
        this.targets = ar;
        //  console.log(this.targets);

        this.start = this.targets[0];
        this.end = this.targets[1];
      // saveWalkers();
       //loadWalkers();
    }


}
Walker.prototype.addItem=function(item) {

}
loadWalkers();
//console.log(walkers);
function deleteWalker(id) {
    //console.log(walkers);
    for(var i=0;i<walkers.length;i++)
    {
        if(walkers[i].id===id)
        {
            walkers.splice(i,1);
            console.log("удалил персонажа с id="+id);
            return;
        }
    }
    saveWalkers();
    loadWalkers();
    //console.log(walkers);
}
function saveWalkers( ) {
 var str="{";
 var saved={};
   // console.log(walkers);
 for(var i in walkers) {
     if(typeof (walkers[i])!=="object")
     continue;
    // var stri = "";
     var w = {};

     try {
         w.curQ=walkers[i].curQ.name;

     }
     catch(e) {
         w.curQ = "null";
     }
     w.log=walkers[i].log.messages;
    // console.log(w.curQ);
     w.start = walkers[i].start.name;

     if (walkers[i].end)
         w.end = walkers[i].end.name;
     else
         w.end = "null";

     if (walkers[i].target)
         w.target = walkers[i].target.name;
     else
         w.target = "null";

     w.home = walkers[i].home.name;
     w.targets=[];
    for( var j in walkers[i].targets)
    {
        if(typeof (walkers[i].targets[j])==="object")
        w.targets[j]=walkers[i].targets[j].name;
    }

     for(var c in walkers[i]) {
         if(!(c in w))
         {
             w[c]=walkers[i][c];
         }
     }
    // console.log(w);
     saved[walkers[i].id]= JSON.stringify(w);
 }
 //console.log(str);
    //console.log(saved);
    var str="{";
    for(var i in saved)
    {
        str+="\""+i+"\":";
        str+=JSON.stringify( saved[i]);
        str+="\,";
        str+="\n";

    }
  //  console.log(str);


    str+="}";
    var ar=[];
    for(var i=1;i<str.length-1;i++) {
        ar[i-1]=str[i];
        if(ar[i-1]==="{" )
        {
            ar[i-1]="<";
        }
        if(ar[i-1]==="}")
        {
            ar[i-1]=">";
        }
    }
    str="{";
    for(var i=0;i<ar.length;i++)
    {
        str+=ar[i];
    }
    //console.log(str);
    if(str.length>12)
    {
        //console.log(str.slice(0,str.length-2));
        str=str.slice(0,str.length-2);
    }
    str+="}";


    fs.writeFileSync("./walkers.json",str);
}
function loadWalkers() {
    walkers=[];
    var walk=fs.readFileSync("./walkers.json");
   // console.log(walk.toString());
    walk=JSON.parse(walk);
    for(var c in walk)
    {
       // console.log(c);
        var str=walk[c];
        //console.log(str);

        var ar=[];
        for(var i=1;i<str.length-1;i++) {
            ar[i-1]=str[i];
            if(ar[i-1]==="<" )
            {
                ar[i-1]="{";
            }
            if(ar[i-1]===">")
            {
                ar[i-1]="}";
            }
        }
        str="{";
        for(var i=0;i<ar.length;i++) {
            str+=ar[i];
        }
        str+="}";
        //console.log(str);
        var w=JSON.parse(str);
        w.start=CITY.findCity(w.start);
        w.end=CITY.findCity(w.end);
        w.home=CITY.findCity(w.home);
        w.target=CITY.findCity(w.target);
        w.log=new GLOG.Glog(w.log);
        //w.curQ=null;
        //w.targets=[];
        w.curQ=GQUEST.getQbyName(w.curQ);
       // console.log(w.curQ);
        //console.log(Walker.prototype);
        var v=Walker.prototype;
        for(var c in v)
        {
            if(typeof (v[c])==="function")
            {
               // console.log("добавил");
                w[c]=v[c];
            }
        }
        //console.log(w.targets);
        if(w.targets)
            for(var i in w.targets)
            {
                if(typeof (w.targets[i])==="string")
                w.targets[i]=CITY.findCity(w.targets[i]);
            }

       walkers[w.id]=w;
       // console.log(w);
    }
//console.log(walkers);
}
function findByID(id) {
 //  loadWalkers();
    for (var i in walkers)
    {
        if(typeof (walkers[i])==="object")
        if(walkers[i].id===id)
        {
            return walkers[i];
        }
    }
}
//console.log(walkers);
module.exports.save=saveWalkers;
module.exports.findById=findByID;
module.exports.reload=loadWalkers;
module.exports.deleteWalker=deleteWalker;
module.exports.createWalker=createWalker;
//module.exports.Walker=Walker;
module.exports.walkers=walkers;

















