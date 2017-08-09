var KillerGame=function()
{
    this.Started=false;
    this.Finished=false;
    this.KillerPlayers=[];
    var Player=function(id)
    {
        this.Id=id;
        this.Killed=0;
        this.Alive=true;
        this.TargetId=0;
        this.SlayerId=0;
    };
    this.Finish=function()//завершение "Киллера":показ результатов и выдача призов
    {
        console.log("Mezhlshupnaya igra v killera zavershilas!Itogi:");
        for (var fini=0;fini<this.KillerPlayers.length;fini++)
        {
            var finstr=Players[GetIndexById(this.KillerPlayers[fini].Id,Players)].Name;
            if (this.KillerPlayers[fini].Alive==true)
            {
                finstr += ":zhiv";
                if (Players[GetIndexById(this.KillerPlayers[fini].Id, Players)].Gender == "f")
                    finstr += "a";
            }
            else
            {
                finstr += ":mertv";
                    if (Players[GetIndexById(this.KillerPlayers[fini].Id,Players)].Gender=="f")
                        finstr+="a";
                finstr+=".Ubiza-";
                finstr+=Players[GetIndexById(this.KillerPlayers[fini].SlayerId,Players)].Name;
            }
            finstr+=".Igrokov ubito:";
            finstr+=this.KillerPlayers[fini].Killed;
            console.log(finstr);
        }
        console.log("Ubivshih bol'she vseh i vizhivshih zhdet nagrada!!");
        var max=0;
        for (fini=0;fini<this.KillerPlayers.length;fini++)
            if (this.KillerPlayers[fini].Killed>max)
                max=this.KillerPlayers[fini].Killed;
        for (fini=0;fini<this.KillerPlayers.length;fini++)
            if ((this.KillerPlayers[fini].Killed==max)||(this.KillerPlayers[fini].Alive==true))
                ItemBase[GetIndexByName("Znachek krutogo killera",ItemBase)].PickUp(Players[GetIndexById(this.KillerPlayers[fini].Id,Players)]);
        this.Finished=true;
    };
    this.GetTargetIdEveryone=function()//выдача всем участникам жертвбрешается проблема с "обиженными",которым не досталась жертва
    {
        for (var gtiei=0;gtiei<this.KillerPlayers.length;gtiei++)
            if ((this.KillerPlayers[gtiei].Alive==true)&&(this.KillerPlayers[gtiei].TargetId==0))
                this.KillerPlayers[gtiei].TargetId=this.GetTargetId(this.KillerPlayers[gtiei]);
    };
    this.GetTargetId=function(character)
    {
        var pickable=0;
        for (var preyci= 0;preyci<this.KillerPlayers.length;preyci++)
        {
            if ((this.KillerPlayers[preyci].Id!=character.Id)&&(this.KillerPlayers[preyci].Alive==true))
            {
                for (var preycj = 0, check = true; preycj < this.KillerPlayers.length; preycj++)  //игрок не охотится на игрока и на него не охотятся
                    if (this.KillerPlayers[preycj].TargetId == this.KillerPlayers[preyci].Id)
                        check = false;
                if ((check==true)&&(this.KillerPlayers[preyci].TargetId!=character.Id))
                    pickable++;
            }
        }
        if (pickable>0)//-иногда кому-то просто может не достаться жерва Т_Т
        {
            do
            {
                do
                    var targetindex = Math.round(Math.random() * (this.KillerPlayers.length - 1));
                while ((character.Id == this.KillerPlayers[targetindex].Id) || (this.KillerPlayers[targetindex].Alive == false));//-не выбирает себя и мертвых
                for (var gtii = 0, gticheck = true; gtii < this.KillerPlayers.length; gtii++)
                    if (this.KillerPlayers[targetindex].Id == this.KillerPlayers[gtii].TargetId)//-жертва у каждого своя
                        gticheck = false;
                if (this.KillerPlayers[targetindex].TargetId == character.Id)//-киллер не может быть жертвой у своей же жертвы
                    gticheck = false;
            }
            while (gticheck == false);
            console.log(Players[GetIndexById(character.Id, Players)].Name, "dolzhen ubit", Players[GetIndexById(this.KillerPlayers[targetindex].Id, Players)].Name);
            return (this.KillerPlayers[targetindex].Id);
        }
        else
            return 0;
    };
    this.Killing=function(killer,prey)
    {
        prey.Alive=false;
        prey.SlayerId=killer.Id;
        killer.Killed++;
        console.log(Players[GetIndexById(killer.Id,Players)].Name,"killed",Players[GetIndexById(prey.Id,Players)].Name,"!!!");
        killer.TargetId=0;
        prey.TargetId=0;
    };
    this.CheckKill=function(firstid,secondid)
    {
        var First=this.KillerPlayers[GetIndexById(firstid,this.KillerPlayers)];
        var Second=this.KillerPlayers[GetIndexById(secondid,this.KillerPlayers)];
        if (First.TargetId==Second.Id)
            this.Killing(First,Second);
        if (Second.TargetId==First.Id)
            this.Killing(Second,First);
        if (this.CheckContinuable() == false)
            this.Finish();
        else
            this.GetTargetIdEveryone();
    };
    this.CheckContinuable=function()//"Киллер" идет до тех пор,пока участвуют,как минимум,3 игрока
    {
        var alive=0;
        for (var i=0;i<this.KillerPlayers.length;i++)
            if (this.KillerPlayers[i].Alive==true)
                alive++;
        if (alive>2)
            return true;
        else
            if (this.Started==true)
                return false;
    };
    this.CheckStartable=function()//инициализация массива игроков.Если участников больше трех,игра начинается
    {
        for (var kisi=0;kisi<Players.length;kisi++)
            this.KillerPlayers.push(new Player(Players[kisi].Id));
        if(this.CheckContinuable()==true)
        {
            this.Started = true;
            console.log("Mezhlshupnaya igra v killera nachinaetsya!!!");
            this.GetTargetIdEveryone();

        }
    };
}
module.exports=KillerGame;