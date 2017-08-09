var db = require("./DB");
var clients = [];
function Client(ip, id) {
    this.ip = ip;
    this.id = id;
    this.persC=0;
    this.getPersC();
    this.login = db.find(id + "login");
}
Client.prototype.getPersC=function() {
    this.persC = db.find(this.id + "persC");
    return this.persC;
};
Client.prototype.setPersC=function(count)
{
    db.change(this.id+"persC",count);
}
Client.prototype.changeId=function(id) {
   //console.log(db.find(this.id+"persC"));
   if(this.persC ===0)
   db.change(this.id+"persC",db.find(this.id+"persC")+1);
   else
   db.change(this.id+"persC",1);

   db.change(this.id+"persID",id);
   db.save();
};
function addClient(ip, id) {
    clients.push(new Client(ip, id));
}
function login(res, login, pass, ip) {
    var id = db.findUser(login, pass);


    if (id !== -1) {
        disLogin(ip);
        addClient(ip, id);
        res.end("вход выполнен");
        return;
    }
    res.end("нету такого пользователя");
}
function disLogin(ip) {
    for (var i = 0; i < clients.length; i++) {
        if (clients[i].ip === ip) {
            //console.log("delete");
            //console.log(clients);
            clients.splice(i,1);
            //console.log(clients);
            return;
        }
    }
}
function getClient(ip) {
    for (var i = 0; i < clients.length; i++)
        if (clients[i].ip === ip)
            return clients[i];
}
module.exports.getClient = getClient;
module.exports.clients = clients;
module.exports.addClient = addClient;
module.exports.login = login;