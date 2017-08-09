GetIndexByName = function (name,bs)
{
    var res=-1;
    for (var i = 0; i < bs.length; i++)
        if (name == bs[i].Name)
            res=i;
    return res;
}
var Town = require("./modules/Town.js");
var Road = require("./modules/Road.js");
var Time = require("./modules/Time.js");
var Obj = require("./modules/Obj.js");
var Quest = require("./modules/Quest.js");
var Towns = require("./modules/Towns.js");
var QuestBase = require("./modules/QuestBase.js");
var Players = require("./modules/Players.js")
global.Towns = Towns;
global.QuestBase = QuestBase;
global.Players = Players;
var globaltime = new Time(1, 8, 0);
global.globaltime=globaltime;
do
{
    //globaltime.SayTime();
    for (var i = 0; i < Players.length; i++) {
        Players[i].Action();
    }
    globaltime.MinuteEncrease();
}
while ((globaltime.Day <14));

