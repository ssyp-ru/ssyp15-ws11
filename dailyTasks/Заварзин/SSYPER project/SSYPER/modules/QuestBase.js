Quest=require("./Quest.js");
Time=require("./Time.js");

var QuestBase=[];
QuestBase.push(new Quest("otzhimaetsya",["gender=m"],0,"e","n",[0],["otzhals9"],[[0],[0]],5));
QuestBase.push(new Quest("need to go shop",[],0,"g","o",[1,500],["BUY KOROVKA AND LUS 500 RUBLEI!!!!!","ne smog cupit'!!!"],[["korovka",-500],0],10));
QuestBase.push(new Quest("must go to de doc",[],0,"g","s",[11],["POCHINILSA"],[[0],[0]],30));
QuestBase.push(new Quest("hochet pley Fatball",["gender=m"],0,"g","o",[10],["PLEID FATBAL AND BREK NOGA!"],[[QuestBase[GetIndexByName("must go to de doc",QuestBase)]]],20));
QuestBase.push(new Quest("nameren kill Dulcev",[],0,"g","o",[6],["killed Dulcev!!!!"],[[100],[0]],5));
QuestBase.push(new Quest("ukushen i dolzhen polechitsya",[],0,"g","o",[11],["vizdorovel!!!"],[[0],[0]],15));
QuestBase.push(new Quest("wanna plei bil'yard",[],0,"g","o",[8,100],["slomal kiy i zaplatil","ne smog zaplatit"],[[-100],[QuestBase[GetIndexByName("otzhimaetsya",QuestBase)]]],30));
QuestBase.push(new Quest("go to brekfast",[new Time(-1,9,0)],30,"gf","r",[6,"bage"],["pozavtrakal","ne pozavtrakal"],[[0],[0]],10));
QuestBase.push(new Quest("go to dinner",[new Time(-1,19,0)],30,"gf","r",[6,"bage"],["pouzhinal","ne pouzhinal"],[[0],[0]],10));
QuestBase.push(new Quest("go to second dinner",[new Time(-1,21,0)],30,"gf","r",[6,"bage"],["povtorouzhinal","ne povtorouzhinal"],[[0],[0]],10));
QuestBase.push(new Quest("go to lunch",[new Time(-1,13,0)],30,"gf","r",[6,"bage"],["poobedal","ne poobedal"],[[0],[0]],10));
QuestBase.push(new Quest("go to sleep",[new Time(-1,23,0)],60,"gf","r",[11],["usnul","ne spit!!!"],[[0],[0]],(8*60)));
QuestBase.push(new Quest("vnezapno usnul",[],0,"e","n",[0],["prosnuls9"],[[0],[0]],15));
QuestBase.push(new Quest("zav9zivaet shnurki",[],0,"e","n",[0],["zav9zal"],[[0],[0]],3));
QuestBase.push(new Quest("reshil podkupit mastera korovkoi",["korovka"],0,"g","o",[6,"korovka"],["PODKUPIL KOROVKOI i POLUCHIL KRUTOI BEIJ!!"],[["-korovka","krutoi beij"]],5));
QuestBase.push(new Quest("poteryal beigik!",["bage"],0,"e","n",[0,"bage"],["plakal i iskal"],[["-bage"]],5));
QuestBase.push(new Quest ("uspet na zaryadku",[new Time (-1,8,30),"gender=m"],20,"gf","r",[10],["nastroenie v poryadke-spasibo zaryadke!","vi otzimaetes"],[[],[QuestBase[GetIndexByName("otzhimaetsya",QuestBase)]]],15));
module.exports=QuestBase