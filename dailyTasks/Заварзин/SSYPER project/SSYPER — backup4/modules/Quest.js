var Quest=function(qnm,qendtm,qtp,qm,qfm,qaw,tw)
{
	this.Name=qnm;
	this.EndTime=qendtm;
	this.Type=qtp; //g-go,gf-go in time
	this.Mission=qm;
	this.Award=qaw;
	this.NotPicked=true;
	this.FinishMessage=qfm;
	this.TimeWaste=tw;
	this.CheckFinish=function(character)
	{
		var completed=false;
		if ((this.Type=="g")||(this.Type=="s"))
			if(character.Start==this.Mission)
			{
				if((character.State!="w"))
				{
					character.WaitProgress = this.TimeWaste;
					character.State = "w";
				}
				completed=true;
			}
		if (this.Type=="sgf")
			if(this.EndTime>0)
			{
				this.EndTime--;
				if (character.Start == this.Mission)
				{
					if((character.State!="w"))
					{
						character.WaitProgress = this.TimeWaste;
						character.State = "w";
					}
					completed=true;
				}
			}
			else
			{
				console.log(character.Name, this.FinishMessage[1]);
				character.Quests.shift();
			}
		if (this.Type=="e")
		{
			if((character.State!="w"))
			{
				character.WaitProgress = this.TimeWaste;
				character.State = "w";
			}
			completed=true;
		}
		if (completed==true)
			if((character.WaitProgress==0)&&(character.State=="w"))
			{
				globaltime.SayTime();
				if (typeof(this.FinishMessage)=="string")
					console.log(character.Name, this.FinishMessage,"and wasted",this.TimeWaste,"minutes");
				else
					console.log(character.Name, this.FinishMessage[0],"and wasted",this.TimeWaste,"minutes");
				this.GiveAward(character);
				character.Quests.shift();
				character.State="t";
			}
	};
	this.GiveAward=function(character)
	{
		switch (typeof (this.Award))
		{
			case "object":
			{
				character.GetQuest(this.Award);
				break;
			}
			case "number":
			{
				character.Money+=this.Award;
				//console.log(character.Money);
				break;
			}
		}
	}
};
module.exports=Quest;