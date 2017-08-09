const CITY=require("./CITIES");
const ROADS=require("./ROADS");
const WALKERS=require("./WALKERS");

//WALKERS.createWalker("VASYA","m");
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
WALKERS.save();
}
//WALKERS.createWalker("Niga","m",25);
//WALKERS.reload();
//WALKERS.save();
//WALKERS.walkers[25].go();
//for(var i=0;i<100;i++)
//walkerManager();

//WALKERS.save();
exports.walkerManager=walkerManager;
