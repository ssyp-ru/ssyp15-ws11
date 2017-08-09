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
		if ((this.Type=="g")||(this.Type=="s"))
			if(character.Start==this.Mission)
			{
				console.log(character.Name, this.FinishMessage);
				console.log("Wasted",this.TimeWaste,"minutes");
				character.Quests.pop();
				globaltime.MinuteEncrease(this.TimeWaste);
				this.GiveAward(character);
			}
		if (this.Type=="sgf")
			if(this.EndTime>0)
			{
				this.EndTime--;
				if (character.Start == this.Mission)
				{
					console.log(character.Name, this.FinishMessage[0]);
					console.log("Wasted",this.TimeWaste,"minutes");
					character.Quests.pop();
					globaltime.MinuteEncrease(this.TimeWaste);
					this.GiveAward(character);
				}
			}
			else
			{
				console.log(character.Name, this.FinishMessage[1]);
				character.Quests.pop();
				this.GiveAward(character);
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

}
module.exports=Quest;