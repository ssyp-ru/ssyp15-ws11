var Quest=function(qnm,qendtm,qtp,qm,qfm,qaw)
{
	this.Name=qnm;
	this.EndTime=qendtm;
	this.Type=qtp; //g-go,gf-go in time
	this.Mission=qm;
	this.Award=qaw;
	this.NotPicked=true;
	this.FinishMessage=qfm;
	this.CheckFinish=function(character)
	{
		switch (this.Type)
		{
			case "g":
			{
				if(character.Start==this.Mission)
				{
					console.log(character.Name,this.FinishMessage)
					character.Quests.pop();
					this.GiveAward(character);
				}
				break;
			}
			case "s":
			{
				if(character.Start==this.Mission)
				{
					console.log(character.Name,this.FinishMessage)
					character.Quests.pop();
					this.GiveAward(character);
				}
				break;
			}
		}
	}
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