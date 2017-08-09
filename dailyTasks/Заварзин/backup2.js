var count=5;
var ElfHpSr=30,ElfDmgSr=40;
var OrkHpSr=50,OrkDmgSr=20;
var ElfArmy=[];
var OrkArmy=[];
var killer,prey,turn="elf";
var NewMob=function(name,hp,damage)
{
	this.Name=name;
	this.HP=hp;
	this.Damage=damage;
	this.SayName=function()
	{
		console.log(this.Name,this.HP,"HP",this.Damage,"dmg");
	}
	this.Fight=function(target)
	{
		//damage=Math.round(Math.random()*10);
		console.log(this.Name,"hit",target.Name,this.Damage,"damage dealt");
		target.HP-=this.Damage;
		target.SayName();
	}
}
for (var i=0;i<count;i++)
	ElfArmy[i]=new NewMob
	(
		"Elf"+(i+1),
		ElfHpSr+20-Math.round(Math.random()*40),
		ElfDmgSr+20-Math.round(Math.random()*40)
	);	
for (var i=0;i<count;i++)      //INIT!!!
	OrkArmy[i]=new NewMob
	(
		"Ork"+(i+1),
		OrkHpSr+20-Math.round(Math.random()*40),
		OrkDmgSr+20-Math.round(Math.random()*40)
	);
while((ElfArmy.length>0)&&(OrkArmy.length>0))
{
	if (turn==="elf")
	{
		killer=Math.round(Math.random()*(ElfArmy.length-1));
		prey=Math.round(Math.random()*(OrkArmy.length-1));
		ElfArmy[killer].Fight(OrkArmy[prey]);
		if (OrkArmy[prey].HP<=0)
		{
			console.log(OrkArmy[prey].Name,"is dead!");
			OrkArmy.splice(prey,1);
		}
		else
		{
			OrkArmy[prey].Fight(ElfArmy[killer]);
			if (ElfArmy[killer].HP<=0)
			{
				console.log(ElfArmy[killer].Name,"is dead!");
				ElfArmy.splice(killer,1);
			}
		}
		turn="ork";
	}
	else
	{
		killer=Math.round(Math.random()*(OrkArmy.length-1));
		prey=Math.round(Math.random()*(ElfArmy.length-1));
		OrkArmy[killer].Fight(ElfArmy[prey]);
		if (ElfArmy[prey].HP<=0)
		{
			console.log(ElfArmy[prey].Name,"is dead!");
			ElfArmy.splice(prey,1);
		}
		else
		{
			ElfArmy[prey].Fight(OrkArmy[killer]);
			if (OrkArmy[killer].HP<=0)
			{
				console.log(OrkArmy[killer].Name,"is dead!");
				OrkArmy.splice(killer,1);
			}
		}
		turn="elf";
	}
	console.log("-----");
}
if (OrkArmy.length===0) 
	console.log("Elf VICTORY >_<");
else
	console.log("ORK EPIC WIN!!!");


