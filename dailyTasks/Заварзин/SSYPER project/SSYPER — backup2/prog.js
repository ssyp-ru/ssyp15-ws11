var Town=require("./modules/Town.js");
var Road=require("./modules/Road.js");
var Obj=require("./modules/Obj.js");
var Time=require("./modules/Time.js");
var Quest=require("./modules/Quest.js");
var Towns=require("./modules/Towns.js");
var QuestBase=require("./modules/QuestBase.js");
var Players=require("./modules/Players.js")
global.Towns=Towns;
global.QuestBase=QuestBase;
global.Players=Players;
QuestGetIndexByName=function(name)
	{
		for (var i=0;i<QuestBase.length;i++)
			if (name==QuestBase[i].Name)
				return i;
	}
var globtime=new Time(1,9,0);
do
{
	globtime.SayTime();
	for (var i=0;i<Players.length;i++)
	{
		Players[i].Action(5);
	}
	globtime.MinuteEncrease(5);
}
while ((globtime.Minute<30));

