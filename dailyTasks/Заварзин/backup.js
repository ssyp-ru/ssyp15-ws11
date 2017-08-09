var count=5;
var mob =[];
var killer,prey,damage;
function strike(attacker,target)
{
	damage=Math.round(Math.random()*50);
	console.log(mob[attacker].Name,"hit",mob[target].Name,damage,"damage dealt");
	mob[target].HP-=damage;
	//mob[attacker].SayName();
	mob[target].SayName();
}
var NewMob=function(name)
{
	this.Name=name;
	this.HP=50;
	this.SayName=function()
	{
		console.log(this.Name,this.HP,"HP");
	}
}
for (var i=0;i<count;i++)
	mob[i]=new NewMob("Ork"+(i+1));
//console.log(mob[0]);
//mob[0].SayName();
while(mob.length>1)
{
	killer=Math.round(Math.random()*(mob.length-1));
	do
		prey=Math.round(Math.random()*(mob.length-1));
	while (killer===prey);
	
	strike(killer,prey);
	if (mob[prey].HP<=0)
	{
		console.log(mob[prey].Name,"is dead!");
		mob.splice(prey,1);
	}
	else
	{
		strike(prey,killer);
		if (mob[killer].HP<=0)
		{
			console.log(mob[killer].Name,"is dead!");
			mob.splice(killer,1);
		}
	}
	//console.log(mob);
}
if (mob.length===0) 
	console.log("No winner >_<");
else
	console.log(mob[0].Name,"is winner!");


