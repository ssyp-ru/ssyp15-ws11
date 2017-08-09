function User(login,pass)
{
    this.login=login;
    this.pass=pass;
}
var db;
var fs=require("fs");

openDb();
//console.log(db);
function check(login,pass,res) {
   openDb();
   var c=count();

   for(var i=0;i<c;i++) {

       if (db[i+"login"]===login)
       {
           res.end("такой пользователь уже зарегистрирован");
           return;
       }

   }

   // console.log(login+pass);
    res.end("успешная регистрация");
    add(login,pass);
}
function add(login,pass) {
    c=count();
    db[c+"login"]=login;
    db[c+"pass"]=pass;
    db[c+"persC"]=0;
    db[c+"ID"]=c;
   // console.log(db);
    save();
}
function find(name) {
    return db[name];
}
function change(name,val) {
    db[name]=val;

}
function save() {

    str=JSON.stringify(db);
    fs.writeFileSync("./log-pas.json",str);
    openDb();
}
function reset() {
    db={};
    save();
}
function count() {
    var count=0;
    for(var c in db)
        count++;

    return count/4;
}
function openDb() {
   db=require( "./log-pas.json");
}
function findUser(login,pass) {
    var c=count();
    for(var i=0;i<c;i++)
    {
        if(db[i+"login"]===login && db[i+"pass"]===pass)
        return i;
    }
    return -1;
}
module.exports.save=save;
module.exports.change=change;
module.exports.findUser=findUser;
module.exports.find=find;
module.exports.check=check;