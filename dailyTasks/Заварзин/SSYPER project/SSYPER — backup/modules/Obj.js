var Obj=function(nm,tp,start,spd)
{
	this.Name=nm;
	this.Type=tp;
	this.Start=start;
	this.End=start;
	this.Speed=spd;
	this.State="t";
	this.Quests=[];
	this.WayProgress=0;
	this.rdsel=start;
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
	this.Action=function(od)
	{
		do 
		{
			switch (this.State)
			{
				case "t":
				{
					for (var qi=0;qi<this.Quests.length;qi++)
						this.Quests[qi].CheckFinish(this);
					if (this.Quests.length>0)
					{
						this.rdsel=this.Quests[0].Mission;
						this.SelectWay(this.rdsel);
						this.State="r";
					}
					else
						if (this.Quests.length==0)
							this.GetQuest();
						
				}
				case "r":
				{
					this.WayProgress-=this.Speed;
					if (this.WayProgress<=0)
					{
						console.log(this.Name,"arrived",Towns[this.End-1].Name);
						//visited[this.End-1]++;
						this.State="t";
						this.Start=this.End;
					}
					break;
				}
			}  
			for (var qi=0;qi<this.Quests.length;qi++)
					this.Quests[qi].CheckFinish(this);
			od--;
		}
		while (od>0);
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
				this.SearchDist(this.Start,this.End)
			}
		}	
	}
	this.GetQuest=function()
	{
		this.Quests.push(QuestBase[Math.round(Math.random()*(QuestBase.length-1))]);
		console.log(this.Name,this.Quests[this.Quests.length-1].Name);
	}
}
module.exports=Obj;
