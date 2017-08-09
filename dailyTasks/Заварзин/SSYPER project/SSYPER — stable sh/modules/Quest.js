var Quest=function(qnm,qstm,qendtm,qtp,qatp,qm,qfm,qaw,tw)
{
	this.Name=qnm;
	this.StartTime=qstm;
	this.EndTime=qendtm;
	this.Type=qtp; //g-go,gf-go in time
	this.AccessType=qatp;
	this.Mission=qm;
	this.Award=qaw;
	this.NotPicked=true;
	this.FinishMessage=qfm;
	this.TimeWaste=tw;
	this.CheckMissionItems=function(character)
	{
		var cmicompl=true;
		console.log(character.Items,this.Mission);
		for (var cmii=1;cmii<this.Mission.length;cmii++)
			switch (typeof (this.Award[cmii]))
			{
				case "number":
				{
					if (character.Money<this.Mission[cmii])
						cmicompl=false;
					break;
				}
				case "string":
				{
					switch(this.Award[cmii])
					{
						case "gender=m":
						{
							if (character.Gender=="f")
								cmicompl=false;
							break;
						}
						case "gender=f":
						{
							if (character.Gender=="m")
								cmicompl=false;
							break;
						}
						default:
						{
							if (GetIndexByName(this.Award[cmii],character.Items)==-1)
							cmicompl=false;
						}
					}
					break;
				}
			}
		return cmicompl;
	}
	this.CheckFinish=function(character)
	{
		var completed=false;
		if (this.Type=="g")
			if((character.Start==this.Mission[0]))
			{
				if((character.State!="w"))
				{
					character.WaitProgress = this.TimeWaste;
					character.State = "w";
					//if (this.CheckMissionItems(character)==true)
				}
				completed=true;
			}
		if (this.Type=="gf")
			if(this.EndTime>0)
			{
				if ((character.Start == this.Mission[0]))
				{
					if((character.State!="w"))
					{
						character.WaitProgress = this.TimeWaste;
						character.State = "w";
					}
					//if (this.CheckMissionItems(character)==true)
					completed=true;
				}
				else
					this.EndTime--;
			}
			else
			{
				//character.Quests.shift();
				this.GiveAward(character,completed);
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
				this.GiveAward(character);
			}
	};
	this.GiveAward=function(character)
	{
		if (this.CheckMissionItems(character)==true)
			gaj=0;
		else
			gaj=1;
		//console.log(this.Award,gaj,this.Award[gaj]);
		for (var gai=0;gai<this.Award[gaj].length;gai++)
			switch (typeof (this.Award[gaj][gai]))
			{
				case "object":
				{
					console.log("poluchen quest");
					character.GetQuest(this.Award[gaj][gai]);
					break;
				}
				case "number":
				{
					character.Money+=this.Award[gaj][gai];
					//console.log(character.Money);
					break;
				}
				case "string":
				{
					character.Items.push(this.Award[gaj][gai]);
					console.log(character.Items);
					break;
				}
		}
		console.log(character.Name, this.FinishMessage[gaj],"and wasted",this.TimeWaste,"minutes");
		character.State="t";
		character.Quests.splice(GetIndexByName(this.Name,character.Quests),1);
		character.SelectedQuest=-1;
	}
	this.TimeCheck=function()
	{
		var result=true;
		if (this.StartTime.Day!=-1)
			if(this.StartTime.Day!=globaltime.Day)
				result=false;
		if (this.StartTime.Hour!=-1)
			if(this.StartTime.Hour!=globaltime.Hour)
				result=false;
		if (this.StartTime.Minute!=-1)
			if(this.StartTime.Minute!=globaltime.Minute)
				result=false;
		return result;
	}
	this.Copy=function(orig)
	{
		this.Name=orig.Name;
		this.StartTime=orig.StartTime;
		this.EndTime=orig.EndTime;
		this.Type=orig.Type;
		this.AccessType=orig.AccessType;
		this.Mission=orig.Mission;
		this.FinishMessage=orig.FinishMessage;
		this.Award=orig.Award;
		this.TimeWaste=orig.TimeWaste;
	}
};
module.exports=Quest;