/**
 * Created by user on 02.08.2015.
 */
var Killer=function()
{
    this.Started=false;
    this.Finished=false;
    this.Players=[];
    this.Player=function(id)
    {
        this.Id=id;
        this.Killed=0;
    }
    this.CheckContinuable=function()
    {
        if (Players.length>2)
            return true;
        else
            if (this.Started==true)
                this.End;
    }
    this.CheckStartable=function()
    {
        if(this.CheckContinuable()==true)
        {
            this.Started = true;
            console.log("Mezhlshupnay igra v killera nachinaetsya!!!");
            for (var kisi=0;kisi<Players.length;kisi++)
            {
                
            }
        }
    }
}