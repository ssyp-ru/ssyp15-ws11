GetIndexByName = function (name,bs)
{
    var res=-1;
    for (var i = 0; i < bs.length; i++)
        if (name === bs[i].Name)
            res = i;
    return res;
}
GetIndexById = function (id,bs)
{
    var res=-1;
    for (var i = 0; i < bs.length; i++)
        if (id === bs[i].Id)
            res = i;
    return res;
}
var Town = require("./modules/Town.js");
var Road = require("./modules/Road.js");
var Time = require("./modules/Time.js");
var Obj = require("./modules/Obj.js");
var Quest = require("./modules/Quest.js");
var Towns = require("./modules/Towns.js");
var QuestBase = require("./modules/QuestBase.js");
var Players = require("./modules/Players.js");
var Item=require("./modules/Item.js");
var ItemBase=require("./modules/ItemBase.js");
var KillerGame=require("./modules/KillerGame.js");
global.ItemBase=ItemBase;
global.Towns = Towns;
global.QuestBase = QuestBase;
global.Players = Players;
global.KillerGame=KillerGame;
var globaltime = new Time(1, 8, 0);
global.globaltime=globaltime;
KillerSSYP = new KillerGame();
KillerSSYP.CheckStartable();
do
{
    //globaltime.SayTime();
    for (var i = 0; i < Players.length; i++)
        Players[i].Action();
    for (var i = 0; i < ItemBase.length; i++)
        ItemBase[i].InvisibilityTimerDown();
    globaltime.MinuteEncrease();
}
while ((globaltime.Day<14)||(globaltime.Hour<8));
globaltime.SayTime();
console.log("Lshup zavershen");





