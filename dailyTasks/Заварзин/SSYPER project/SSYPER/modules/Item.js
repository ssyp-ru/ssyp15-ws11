/**
 * Created by user on 31.07.2015.
 */
var Item=function(name,location)
{
    this.Name=name;
    this.Location=location;
    this.State="p";
    this.Id=0;
    this.Drop=function(character)
    {
        //this.Location=character.Start;+
        character.Items.splice(GetIndexByName(this.Name,character.Items),1);
        this.State="i";
        this.InvisibilityTimer=30;
    }
    this.PickUp= function(character)
    {
        this.State="p";
        this.Location=character.Start;
        character.Items.push(this);
        console.log(character.Name,"poluchil",this.Name,"!!!");
    }
    this.InvisibilityTimerDown=function()
    {
        if ((this.InvisibilityTimer>0)&&(this.State=="i"))
        {
            if (this.State = "i")
                this.InvisibilityTimer--;
            if (this.InvisibilityTimer == 0)
                this.State = "d";
        }
    }
    this.Give=function(playerfrom,playerto)
    {
        playerfrom.Items.splice(GetIndexByName(this.Name,playerfrom.Items),1);
        this.PickUp(playerto);
    }
}
module.exports=Item;
