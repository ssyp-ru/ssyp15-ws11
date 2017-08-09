Quest=require("./Quest.js");
QuestGetIndexByName=function(name)
	{
		for (var i=0;i<QuestBase.length;i++)
			if (name==QuestBase[i].Name)
				return i;
	}
var QuestBase=[];
QuestBase.push(new Quest("need to go shop",0,"g",1,"BUY KOROVKA AND LUS 500 RUBLEI!!!!!",-500,10));
QuestBase.push(new Quest("go to de doc",0,"s",11,"POCHINILSA",0,30));
QuestBase.push(new Quest("hochet pley Fatball",0,"g",10,"PLEID FATBAL AND BREK NOGA!",QuestBase[QuestGetIndexByName("go to de doc")],20));
QuestBase.push(new Quest("nameren kill Dulcev",0,"g",6,"killed Dulcev!!!!",100,5));
QuestBase.push(new Quest("ukushen i dolzhen polechitsya",0,"g",11,"vizdorovel!!!",0,15));
QuestBase.push(new Quest("wanna plei bil'yard",0,"g",8,"slomal kiy i zaplatil",-100,30));
QuestBase.push(new Quest("go to brekfast","10","sgf",6,["poel","ne poel"],0,30));
module.exports=QuestBase;