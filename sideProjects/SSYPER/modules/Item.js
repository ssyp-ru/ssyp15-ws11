var Item=function(name,location)
{
    this.Name=name;
    this.Location=location;
    this.State="p";
    this.Id=0;
    this.Drop=function(character)//при выпадении предмет становится невидимым на некоторое время,чтобы потерявший его тут же не находил(это ведь странно!)
    {
        character.Items.splice(GetIndexByName(this.Name,character.Items),1);
        this.State="i";
        this.InvisibilityTimer=30;
    };
    this.PickUp= function(character)//подбирание предмета
    {
        this.State="p";
        this.Location=character.Start;
        character.Items.push(this);
        console.log(character.Name,"poluchil",this.Name,"!!!");
    };
    this.InvisibilityTimerDown=function()//предметы с Рики не дружат и поэтому их инвиз ограничен по времени
    {
        if ((this.InvisibilityTimer>0)&&(this.State=="i"))
        {
            if (this.State = "i")
                this.InvisibilityTimer--;
            if (this.InvisibilityTimer == 0)
                this.State = "d";
        }
    };
    this.Give=function(playerfrom,playerto)//передача предмета от одного участника другому
    {
        playerfrom.Items.splice(GetIndexByName(this.Name,playerfrom.Items),1);
        this.PickUp(playerto);
    };
};
module.exports=Item;
