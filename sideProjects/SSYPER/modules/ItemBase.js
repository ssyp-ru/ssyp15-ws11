var  Item=require("./Item.js");
var Players=require("./Players.js");
var ItemBase=[];
for (var i=0;i<Players.length;i++)//у каждого игрока с начала игры есть индивидуальный бейдж,привязанный по его id
{
    ItemBase.push(new Item(Players[i].Name+"s bage",Players[i].Start));
    ItemBase[i].PickUp(Players[i]);
    ItemBase[i].Id=Players[i].Id;
}
ItemBase.push(new Item("korovka",1));
ItemBase.push(new Item("krutoi beij",1));
ItemBase.push(new Item ("kamen",11));
ItemBase[ItemBase.length-1].Id=5;
ItemBase[ItemBase.length-1].State="d";
ItemBase.push(new Item("Znachek krutogo killera",1));
ItemBase.push(new Item("palka",6));
ItemBase[ItemBase.length-1].State="d";
ItemBase.push(new Item ("book",2));
module.exports=ItemBase;