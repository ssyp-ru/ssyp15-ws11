Quest=require("./Quest.js");
Time=require("./Time.js");

var QuestBase=[];
QuestBase.push(new Quest("otzhimaetsya",0,0,"e","n",[0],["otzhals9"],[[0],[0]],5));
QuestBase.push(new Quest("need to go shop",0,0,"g","o",[1,500],["BUY KOROVKA AND LUS 500 RUBLEI!!!!!","ne smog cupit'!!!"],[["korovka",-500],0],10));
QuestBase.push(new Quest("go to de doc",0,0,"g","s",[11],["POCHINILSA"],[[0],[0]],30));
QuestBase.push(new Quest("hochet pley Fatball",0,0,"g","o",[10],["PLEID FATBAL AND BREK NOGA!"],[[QuestBase[GetIndexByName("go to de doc",QuestBase)]]],20));
QuestBase.push(new Quest("nameren kill Dulcev",0,0,"g","o",[6],["killed Dulcev!!!!"],[[100],[0]],5));
QuestBase.push(new Quest("ukushen i dolzhen polechitsya",0,0,"g","o",[11],["vizdorovel!!!"],[[0],[0]],15));
QuestBase.push(new Quest("wanna plei bil'yard",0,0,"g","o",[8,100],["slomal kiy i zaplatil"],[[-100],[QuestBase[GetIndexByName("otzhimaetsya",QuestBase)]]],30));
QuestBase.push(new Quest("go to brekfast",new Time(-1,9,0),30,"gf","r",[6],["pozavtrakal","ne pozavtrakal"],[[0],[0]],10));
QuestBase.push(new Quest("go to dinner",new Time(-1,19,0),30,"gf","r",[6],["pouzhinal","ne pouzhinal"],[[0],[0]],10));
QuestBase.push(new Quest("go to second dinner",new Time(-1,21,0),30,"gf","r",[6],["povtorouzhinal","ne povtorouzhinal"],[[0],[0]],10));
QuestBase.push(new Quest("go to lunch",new Time(-1,13,0),30,"gf","r",[6],["poobedal","ne poobedal"],[[0],[0]],10));
QuestBase.push(new Quest("go to sleep",new Time(-1,23,0),60,"gf","r",[11],["usnul","ne spit!!!"],[[0],[0]],(8*60)));
QuestBase.push(new Quest("vnezapno usnul",0,0,"e","n",[0],["prosnuls9"],[[0],[0]],15));
QuestBase.push(new Quest("zav9zivaet shnurki",0,0,"e","n",[0],["zav9zal"],[[0],[0]],3));
QuestBase.push(new Quest("nashel beigik",0,0,"e","o",[0],["popitals9 pochest imya"],[["chei-to bagik"]],2));
module.exports=QuestBase