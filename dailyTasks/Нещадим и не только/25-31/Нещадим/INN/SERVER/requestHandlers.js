var reader = require("./reader");
var clients=require("./clients.js");
var walkers=require("../WALKERS.js");
//var NPCS=require("../NPCS");
//console.log(jso);
var db = require("./DB.js");
function start(res) {
    console.log("Request handler 'start' was called");
    reader.sendFileSave("./start.html", res);
    // res.end();
}
function upload(res) {
    console.log("Request handler 'upload' was called");
    res.write("Hello Upload")
    res.end();
}
function register(res, params) {
    //console.log(params);
    if (countInObj( params)) {
       // console.log("в регистер");
        //console.log(db.db);
        db.check(params["login"], params["pass"],res);
    }
    else {
        console.log("Request handler 'reqister' was called");
        reader.sendFileSave("./register.html", res);
    }
}
function login(res,params) {

    clients.login(res,params["login"],params["pass"],params["ip"]);
}
function create(res,params) {
   // console.log("создаю персонажа");
    var client=clients.getClient(params["ip"]);
    if(client) {
        var persC=client.getPersC();
        var idO=client.id;
       // walkers.deleteWalker(idO);
       // console.log("ID==="+idO);
        walkers.createWalker(params["name"]+"", params["gend"]+"",idO);
        if(persC===0)
        client.setPersC(1);

        //walkers.reload();
        client.getPersC();
    }
    res.end();
}
function imba(res) {
   for(var i=0;i<clients.clients.length;i++)
   {
       var str="";
       str+=clients.clients[i].login.toString()+" "+clients.clients[i].ip.toString();
       res.write(str);
       res.write("\n");
   }

    res.end();
}
function me(res) {
    reader.sendFileSave("./me.html", res);
}
function get(res,params) {
    var client=clients.getClient(params["ip"]);
    if(client) {

      //  console.log(params["need"]);

        if(client[params["need"]]!==0)
        res.end( client[params["need"]].toString());
        else
        res.end("0");
    }
    else
    res.end("UNLOGINED");

}
function getInfo(res,params) {
    var client=clients.getClient(params["ip"]);
    if(client)
    {
        var  id=client.id;
        var walker=walkers.findById(id);
        if(walker)
        {
            var ret;
            try {
                ret= walker[params["need"]].toString();
            }
            catch(e) {
               ret="null";
            }
            res.end(ret);
        }
        else
        res.end();
        //res.end(walkers.findById(id)[params["need"]].toString());
    }
    else
    res.end("UNLOGINED");
}
function getNpcs(res) {
    //res.write(NPCS.getFN());
    res.end();
}
exports.get=get;
exports.login=login;
exports.start = start;
exports.upload = upload;
exports.register = register;
exports.imba=imba;
exports.me=me;
exports.create=create;
exports.getInfo=getInfo
exports.getNpcs=getNpcs;
function countInObj(a) {
    var count=0;
    for(var c in a)
    {
        count++;
    }
    return count;
}
