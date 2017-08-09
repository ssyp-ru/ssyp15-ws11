var server=require("./server.js");
var router=require("./router.js");
var requestHandlers=require("./requestHandlers.js");
var Gdate=new require("./GDate.js");
//var get_ip=require("ipware")().get_ip;
var date=new Gdate();

var topmain=require("../TOPMAIN.js");
var time=0;
setInterval(function() {
   topmain.walkerManager();
   time=date.getFullTime();
   console.log(time);
   date.time++;
},1700);
//console.log(date);
var handle={};
handle['/']=requestHandlers.start;
handle['/start']=requestHandlers.start;
handle['/upload']=requestHandlers.upload;
handle['/register']=requestHandlers.register;
handle['/login']=requestHandlers.login;
handle['/111111']=requestHandlers.imba;
handle["/me"]=requestHandlers.me;
handle["/get"]=requestHandlers.get;
handle["/create"]=requestHandlers.create;
handle["/getI"]=requestHandlers.getInfo;
handle["/getNpcs"]=requestHandlers.getNpcs;
server.start(router.route,handle);
