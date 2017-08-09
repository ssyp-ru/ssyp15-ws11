var Time=function(tid,tih,tim)
{
	this.Day=tid;
	this.Hour=tih;
	this.Minute=tim;
	this.SayTime=function()
	{
		var timestr="Day ";
		timestr+=this.Day;
		timestr+=" ";
		if (this.Hour<10)
			timestr+="0";
		timestr+=this.Hour;
		timestr+=":";
		if (this.Minute<10)
			timestr+="0";
		timestr+=this.Minute;
		console.log(timestr);
	}
	this.MinuteEncrease=function(addm)
	{
		this.Minute+=addm;
		if (this.Minute>=60)
		{
			this.Minute-=60;
			this.Hour++;
		}
		if (this.Hour>23)
		{
			this.Hour-=23;
			this.Day++;
		}
	}
}
var Town=function(cnm,rds)
{
	this.Name=cnm;
	this.Roads=rds;
	this.Sets=0;
}
var Road=function(bg,end,len)
{
	this.Start=bg;
	this.End=end;
	this.Length=len;
}
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
	this.OneHour=function()
	{
		switch (this.State)
		{
			case "t":
			{
				//this.rdsel=Math.round(Math.random()*(Towns[this.Start-1].Roads.length-1));
				//console.log(this.Start,this.rdsel)
				//this.End=Towns[this.Start-1].Roads[this.rdsel].End;
				//this.WayProgress=Towns[this.Start-1].Roads[this.rdsel].Length;
				/*
				if(this.Start==this.rdsel) 
				{
					this.rdsel=Math.round(Math.random()*(Towns.length-1))+1;
					console.log(this.rdsel);
				}*/
				if (this.Quests.length>0)
				{
					this.rdsel=this.Quests[0].Mission;
					this.SelectWay(this.rdsel);
					this.State="r";
				}
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
		console.log(this.Name,"must",this.Quests[this.Quests.length-1].Name);
	}
}
var QuestBase=[];
QuestBase.push(new Quest("Go to shop",0,"g",1,"BUY KOROVKA AND LUS 500 RUBLEI!!!!!"));
QuestBase.push(new Quest("Pley Fatball",0,"g",10,"PLEID FATBAL AND BREK NOGA!"));
QuestBase.push(new Quest("kill Dulcev",0,"g",6,"killed Dulcev!!!!"));
var Objs=[];
Objs[0]=new Obj("Player","p",11,50);
var Towns=[];
Towns[0]=new Town("Shop",[new Road(1,2,30)]);
Towns[1]=new Town("Gate",[new Road(2,1,30),new Road(2,3,70)]);
Towns[2]=new Town("N1",[new Road(3,2,70),new Road(3,4,10),new Road(3,5,150)]);
Towns[3]=new Town("Workshop",[new Road(4,3,10)]);
Towns[4]=new Town("N2",[new Road(5,3,150),new Road(5,6,10),new Road(5,7,20)]);
Towns[5]=new Town("Canteen",[new Road(6,5,10)]);
Towns[6]=new Town("N3",[new Road(7,5,20),new Road(7,8,90),new Road(7,9,100)]);
Towns[7]=new Town("Pool",[new Road(8,7,90)]);
Towns[8]=new Town("Square",[new Road(9,7,100),new Road(9,10,100),new Road(9,11,20)]);
Towns[9]=new Town("Soccer",[new Road(10,9,100)]);
Towns[10]=new Town("MainHouse",[new Road(11,9,20)]);
//var visited=[0,0,0,0,0,0,0,0,0,0,0]
var globtime=new Time(1,9,0);
do
{
	globtime.SayTime();
	for (var obji=0;obji<Objs.length;obji++)
	{
		if (Objs[obji].Quests.length==0)
			Objs[obji].GetQuest();
		Objs[obji].OneHour();
		for (var qi=0;qi<Objs[obji].Quests.length;qi++)
			Objs[obji].Quests[qi].CheckFinish(Objs[obji]);
		//console.log(Objs[obji].Name,":",Objs[obji].Start,"to",Objs[obji].End,Objs[obji].WayProgress,"km left");
	}
	globtime.MinuteEncrease(5);
}
while ((globtime.Hour<10));

