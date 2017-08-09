var Quest=function(qnm,qendtm,qtp,qm,qfm)
{
	this.Name=qnm;
	this.EndTime=qendtm;
	this.Type=qtp; //g-go,gf-go in time
	this.Mission=qm;
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
				}
				break;
			}
		}
	}
}
module.exports=Quest;