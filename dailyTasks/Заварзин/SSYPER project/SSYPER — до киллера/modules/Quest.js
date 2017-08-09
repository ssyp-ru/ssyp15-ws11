var Quest=function(qnm,qstn,qendtm,qtp,qatp,qm,qfm,qaw,tw)
{
	this.Name=qnm;
	this.StartNeeds=qstn;
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
		for (var cmii=1;cmii<this.Mission.length;cmii++)
			switch (typeof (this.Mission[cmii])) //!!!!!!!!!!!!!!!!!
			{
				case "number":
				{
					if (character.Money<this.Mission[cmii])
						cmicompl=false;
					break;
				}
				case "string":
				{
					switch(this.Mission[cmii])
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
						case "bage":
						{
							if (GetIndexById(character.Id,character.Items)==-1)
								cmicompl=false;
							break;
						}
						default:
						{
							if (GetIndexByName(this.Mission[cmii],character.Items)==-1)
								cmicompl=false;
							break;
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
		console.log(character.Name, this.FinishMessage[gaj],"and wasted",this.TimeWaste,"minutes");
		//console.log(this.Award,gaj,this.Award[gaj]);
		for (var gai=0;gai<this.Award[gaj].length;gai++)
			switch (typeof (this.Award[gaj][gai]))
			{
				case "object":
				{
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
					if (this.Award[gaj][gai][0]=="-")
					{
						var avardstr=this.Award[gaj][gai].slice(1);
						if (avardstr=="bage")
						{
							character.Items[GetIndexById(character.Id, character.Items)].Drop(character);
						}
						else
							character.Items.splice(GetIndexByName(avardstr,character.Items),1);
					}
					else
					{
						if (this.Award[gaj][gai]=="bage")
							character.Items[GetIndexById(character.Id,character.Items)].PickUp(character);
						else
						//character.Items.push(ItemBase[GetIndexByName(this.Award[gaj][gai],ItemBase)]);
							ItemBase[GetIndexByName(this.Award[gaj][gai], ItemBase)].PickUp(character);
					}
					//console.log(character.Items);
					break;
				}
		}
		character.State="t";
		character.Quests.splice(GetIndexByName(this.Name,character.Quests),1);
		character.SelectedQuest=-1;
	}
	this.TimeCheck=function()
	{
		var result=true;
		if (this.StartNeeds[0].Day!=-1)
			if(this.StartNeeds[0].Day!=globaltime.Day)
				result=false;
		if (this.StartNeeds[0].Hour!=-1)
			if(this.StartNeeds[0].Hour!=globaltime.Hour)
				result=false;
		if (this.StartNeeds[0].Minute!=-1)
			if(this.StartNeeds[0].Minute!=globaltime.Minute)
				result=false;
		return result;
	}
	this.CheckStartItems=function(character)
	{
		scresult=true;
		for (var qsci=0;qsci<this.StartNeeds.length;qsci++)
			switch (typeof(this.StartNeeds[qsci]))
			{
				case "object":
				{
					scresult=this.TimeCheck();
					break;
				}
				case "string":
				{
					switch(this.StartNeeds[qsci])
					{
						case "gender=m":
						{
							if (character.Gender == "f")
								scresult = false;
							break;
						}
						case "gender=f":
						{
							if (character.Gender == "m")
								scresult = false;
							break;
						}
						case "bage":
						{
							if (GetIndexById(character.Id,character.Items)==-1)
								scresult=false;
							break;
						}
						default:
						{
							if (GetIndexByName(this.StartNeeds[qsci], character.Items) == -1)
								scresult = false;
							break;
						}
					}
					break;
				}
			}
		return scresult;
	}
	this.Copy=function(orig)
	{
		this.Name=orig.Name;
		this.StartNeeds=orig.StartNeeds;
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