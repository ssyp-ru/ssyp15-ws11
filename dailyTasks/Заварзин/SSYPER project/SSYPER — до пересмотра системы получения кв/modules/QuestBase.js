Quest=require("./Quest.js");
Time=require("./Time.js");

var QuestBase=[];
QuestBase.push(new Quest("need to go shop",0,0,"g","o",1,"BUY KOROVKA AND LUS 500 RUBLEI!!!!!",-500,10));
QuestBase.push(new Quest("go to de doc",0,0,"g","s",11,"POCHINILSA",0,30));
QuestBase.push(new Quest("hochet pley Fatball",0,0,"g","o",10,"PLEID FATBAL AND BREK NOGA!",QuestBase[GetIndexByName("go to de doc",QuestBase)],20));
QuestBase.push(new Quest("nameren kill Dulcev",0,0,"g","o",6,"killed Dulcev!!!!",100,5));
QuestBase.push(new Quest("ukushen i dolzhen polechitsya",0,0,"g","o",11,"vizdorovel!!!",0,15));
QuestBase.push(new Quest("wanna plei bil'yard",0,0,"g","o",8,"slomal kiy i zaplatil",-100,30));
QuestBase.push(new Quest("go to brekfast",new Time(-1,9,0),10,"gf","r",6,["poel","ne poel"],0,15));
QuestBase.push(new Quest("vnezapno usnul",0,0,"e","n",0,"prosnuls9",0,15));
QuestBase.push(new Quest("zav9zivaet shnurki",0,0,"e","n",0,"zav9zal",0,3));
module.exports=QuestBase;