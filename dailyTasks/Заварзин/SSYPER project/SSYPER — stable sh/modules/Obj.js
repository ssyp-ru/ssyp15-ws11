//Time=require("./Time.js");
var Obj=function(nm,ge,start,spd)
{
	this.Name=nm;
	this.Start=start;
	this.End=start;
	this.Speed=spd;
	this.State="t";
	this.Quests=[];
	this.WayProgress=0;
	this.WaitProgress=0;
	this.SelectedQuest=-1;
	this.rdsel=start;
	this.Items=[];
	this.Money=500;
	this.Gender=ge;
	this.SearchDist=function(FROM,TO)
	{
		for (var i=0;i<Towns.length;i++)
			for (var j=0;j<Towns[i].Roads.length;j++)
				if ((FROM==Towns[i].Roads[j].Start)&&(TO==Towns[i].Roads[j].End))
				{
					this.WayProgress=Towns[i].Roads[j].Length;
					break;
				}
	}
	this.Action=function()
	{
		this.GetQuest();
		switch (this.State)
		{
			case "t":
			{
				if (this.Quests.length>0)
				{
					if (this.SelectedQuest < 0)
					{
						this.SelectedQuest = Math.round(Math.random() * (this.Quests.length - 1));//можно выставить случайное значение!-ВЫСТАВИЛ
						this.rdsel = this.Quests[this.SelectedQuest].Mission[0];
					}
					else
					{
						this.rdsel = this.Quests[this.SelectedQuest].Mission[0];
						this.SelectWay(this.rdsel);
						this.State = "r";
					}
				}
				break;
			}
			case "r":
			{
				this.WayProgress-=this.Speed;
				if (this.WayProgress<=0)
				{
					globaltime.SayTime();
					console.log(this.Name,"arrived",Towns[this.End-1].Name);
					//visited[this.End-1]++;
					this.State="t";
					this.Start=this.End;
				}
				break;
			}
			case "w":
			{
				this.WaitProgress-=1;
				//console.log(this.Name,"stay in",Towns[this.End-1].Name);
				break;
			}
		}
		for (var qi=0;qi<this.Quests.length;qi++)
			this.Quests[qi].CheckFinish(this);
	}
	this.Check=function(target)
	{
		if ((((this.Start==target.Start)&&(this.End==target.End)&&(this.WayProgress-target.WayProgress<=5)))||((this.Start==target.End)&&(this.End==target.Start)&&(this.WayProgress-Towns[target.Start-1].Roads[target.rdsel].Length-target.WayProgress<=5)))
		{
				console.log("Player:Hi,Zombie!!!");
				playeralive=false;
		}
	}
	this.SelectWay=function(target)
	{
		for (var i=0;i<Towns.length;i++)
			Towns[i].Sets=0;
		wavesize=1;
		Towns[target-1].Sets=wavesize;
		var targetsearched=false;
		do 
		{
			wavesize++;
			waveencreased=false;
			for (i=0;i<Towns.length;i++)
				if (Towns[i].Sets==wavesize-1)
					for (var j=0;j<Towns[i].Roads.length;j++)
					{
						if (Towns[Towns[i].Roads[j].End-1].Sets==0)
						{
							Towns[Towns[i].Roads[j].End-1].Sets=wavesize;
							waveencreased=true;
						}
						if (Towns[i].Roads[j].End==this.End)
							targetsearched=true;
					}
		}
		while ((waveencreased==true)&&(targetsearched==false))
		for (var j=0;j<Towns[this.Start-1].Roads.length;j++)
		{	
			if (Towns[Towns[this.Start-1].Roads[j].End-1].Sets==wavesize-1)
			{
				//console.log(wavesize,this.Start);
				this.End=Towns[this.Start-1].Roads[j].End;
				this.SearchDist(this.Start,this.End);
			}
		}	
	}
	this.GetQuest=function(qu)
	{
		var ind,newquest=new Quest();
		if (this.State!="w")
			var newq=Math.round(Math.random()*9);
			if (qu==undefined)
			{
				if (newq == 0)
				{
					do
						ind = Math.round(Math.random() * (QuestBase.length - 1));
					while ((QuestBase[ind].Type == "r") || (QuestBase[ind].Type == "s"));
				}
			}
			else
			{
				ind=GetIndexByName(qu.Name,QuestBase);
				//console.log("q")
			}
			if (QuestBase[ind]!=undefined)
				//if ((((QuestBase[ind].AccessType=="o")||(QuestBase[ind].AccessType=="n"))&&(QuestBase[ind].NotPicked==true))||(QuestBase[ind].Type=="e"))
				//if (!(((QuestBase[ind].AccessType=="o")&&(QuestBase[ind].NotPicked==false))||(QuestBase[ind].Type=="r")))
				if (((QuestBase[ind].AccessType=="o")&&(QuestBase[ind].NotPicked==true))||(QuestBase[ind].AccessType=="n"))
				{
					globaltime.SayTime();
					newquest.Copy(QuestBase[ind]);
					this.Quests.push(newquest);
					console.log(this.Name,this.Quests[this.Quests.length-1].Name);//,QuestGetIndexByName(this.Quests[this.Quests.length-1].Name));
					QuestBase[GetIndexByName(this.Quests[this.Quests.length-1].Name,QuestBase)].NotPicked=false;
				}
		for (var gti=0;gti<QuestBase.length;gti++)
		{
			if (QuestBase[gti].AccessType=="r")
			{
				if (QuestBase[gti].TimeCheck()==true)
				{
					//console.log("raspisanie!");
					globaltime.SayTime();
					newquest.Copy(QuestBase[gti]);
					this.Quests.push(newquest);
					console.log(this.Name, this.Quests[this.Quests.length - 1].Name);
					this.SelectedQuest=this.Quests.length-1;
				}
			}
		}

	}
}
module.exports=Obj;
