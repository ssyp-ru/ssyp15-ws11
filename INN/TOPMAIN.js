var GDate= require("./SERVER/GDate.js");
global.date=new GDate(13);
const CITY=require("./CITIES");
const ROADS=require("./ROADS");
const WALKERS=require("./WALKERS");
const NPCS=require("./NPCS");


function walkerManager() {
 //   cDay++;
   // console.log(WALKERS.walkers);
    for (var c in WALKERS.walkers)
    {
        if(typeof (WALKERS.walkers[c])==="object")
        {
            WALKERS.walkers[c].go();
        }

    }

    for (var c in NPCS.npcs)
    {
        if(typeof (NPCS.npcs[c])==="object")
        {
            NPCS.npcs[c].go();
        }

    }

WALKERS.save();
}
//for(var i=0;i<100000;i++)
//walkerManager();
//console.log(WALKERS.walkers[25].getCofQ("Сходи на ужин"));
//WALKERS.save();
exports.walkerManager=walkerManager;
