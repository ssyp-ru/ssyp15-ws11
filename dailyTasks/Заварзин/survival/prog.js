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
var Obj=function(nm,tp,start,spd)
{
	this.Name=nm;
	this.Type=tp;
	this.Start=start;
	this.End=start;
	this.Speed=spd;
	this.State="t";
	this.Progress=0;
	this.rdsel=0;
	this.SearchDist=function(FROM,TO)
	{
		for (var i=0;i<Towns.length;i++)
			for (var j=0;j<Towns[i].Roads.length;j++)
				if ((FROM==Towns[i].Roads[j].Start)&&(TO==Towns[i].Roads[j].End))
				{
					this.Progress=Towns[i].Roads[j].Length;
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
				//this.Progress=Towns[this.Start-1].Roads[this.rdsel].Length;
				switch (this.Type)
				{
					case "p":
					{
						this.SelectWay(1);
						this.State="r";
						break;
					}
					case "z":
					{
						this.SelectWay(Objs[0].End);
						this.State="r";
						break;
					}
				}
				break;
			}
			case "r":
			{
				this.Progress-=this.Speed;
				if (this.Progress<=0)
				{
					console.log(this.Name,"arrived",Towns[this.End-1].Name);
					this.State="t";
					this.Start=this.End;
				}
				break;
			}
		}                
	}
	this.Check=function(target)
	{
		if ((((this.Start==target.Start)&&(this.End==target.End)&&(this.Progress-target.Progress<=5)))||((this.Start==target.End)&&(this.End==target.Start)&&(this.Progress-Towns[target.Start-1].Roads[target.rdsel].Length-target.Progress<=5)))
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
		for (i=0;i<Towns.length;i++)
			if (Towns[i].Sets==wavesize)
			{
				for (var j=0;j<Towns[i].Roads.length;j++)
				{	
					if (Towns[Towns[i].Roads[j].End-1].Sets==wavesize-1)
					{
						console.log(wavesize,i);
						this.End=i;
						this.SearchDist(this.Start,this.End)
					}
				}	
				break;
			}
	}
}

var Objs=[];
Objs[0]=new Obj("Player","p",7,5);
var zcount=1;
for (i=1;i<zcount+1;i++)
	Objs[i]=new Obj("Zombie"+i,"z",6+1-i,2);
var Towns=[];
Towns[0]=new Town("London",[new Road(1,2,10)]);
Towns[1]=new Town("Berlin",[new Road(2,1,10),new Road(2,3,8),new Road(2,7,5)]);
Towns[2]=new Town("Moscow",[new Road(3,2,8),new Road(3,4,8),new Road(3,5,11)]);
Towns[3]=new Town("Kiev",[new Road(4,3,8),new Road(4,5,13)]);
Towns[4]=new Town("Astana",[new Road(5,3,11),new Road(5,4,13),new Road(5,6,7),new Road(5,7,3)]);
Towns[5]=new Town("Mumbai",[new Road(6,5,7)]);
Towns[6]=new Town("Rome",[new Road(7,2,5),new Road(7,5,3)])
var globtime=1,playeralive=true;
do
{
	console.log("Hour",globtime);
	for (var obji=0;obji<Objs.length;obji++)
	{
		Objs[obji].OneHour();
		console.log(Objs[obji].Name,":",Objs[obji].Start,"to",Objs[obji].End,Objs[obji].Progress,"km left");
	}
	for (i=1;i<zcount+1;i++)
		Objs[0].Check(Objs[i]);
	globtime++;
}
while ((globtime<10)&&(playeralive));

