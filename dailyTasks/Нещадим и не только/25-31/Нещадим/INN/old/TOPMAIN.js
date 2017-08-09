const CITY=require("./CITIES");
const ROADS=require("./ROADS");
const WALKERS=require("./WALKERS");

var cDay=0;
//WALKERS.createWalker("VASYA","m");
function walkerManager() {
    cDay++;
   // console.log(WALKERS.walkers);
    for (var i=0;i<WALKERS.walkers.length;i++)
    {
        console.log("go");
        WALKERS.walkers[i].go();
    }
    //console.log(WALKERS.walkers);
    WALKERS.save();
    //WALKERS.reload();
}
exports.walkerManager=walkerManager;
