var server = require("./server.js");
var router = require("./router.js");
var requestHandlers = require("./requestHandlers.js");
var Gdate = new require("./GDate.js");
var SS = require("./SS.js");
var date = new Gdate(7);
var WALKERS = require("../WALKERS.js")
var topmain = require("../TOPMAIN.js");
global.date = date;
var time = 0;
global.time = time;
global.clear = false;
setInterval(function () {
    topmain.walkerManager();
    console.log(date.getFullDate());
    //console.log(time);
    if (date.getMinutes() === 1 && date.getHours() === 0
    )
    {
        for (var i in WALKERS.walkers)
            if (typeof (WALKERS.walkers[i]) === "object")
                try {
                    WALKERS.walkers[i].resetCompQ();
                }
                catch(e)
                {
                    console.log("Troubles podiehali");
                }
    }
    date.time++;
}, 1700);
var handle = {};
handle['/avtors'] = requestHandlers.Avtors;
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/register'] = requestHandlers.register;
handle['/login'] = requestHandlers.login;
//handle['/111111']=requestHandlers.imba;
handle["/me"] = requestHandlers.me;
handle["/get"] = requestHandlers.get;
handle["/create"] = requestHandlers.create;
handle["/getI"] = requestHandlers.getInfo;
handle["/getNpc"] = requestHandlers.getNF;
handle["/time"] = requestHandlers.Time;
handle["/top"] = requestHandlers.Top;
handle["/topP"] = requestHandlers.TopP;
SS.start();
server.start(router.route, handle);
