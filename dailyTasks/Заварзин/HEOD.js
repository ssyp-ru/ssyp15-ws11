var count=12;
var ElfHpSr=50,ElfDmgSr=60;
var OrkHpSr=100,OrkDmgSr=30;
var HumanHpSr=75,HumanDmgSr=45;
var DwarfHpSr=150,DwarfDmgSr=15;
var Battle=[];
var killer,prey,rand;
var Fighter=function(name,type,hp,damage)
{
	this.Name=name;
	this.HP=hp;
	this.Type=type;
	this.Damage=damage;
	this.SayName=function()
	{
		console.log(this.Name,this.HP,"HP",this.Damage,"dmg");
	}
	this.Fight=function(target)
	{
		//damage=Math.round(Math.random()*10);
		var strikedmg=this.Damage+this.Damage-Math.round(Math.random()*this.Damage*2);
		console.log(this.Name,"hit",target.Name,strikedmg,"damage dealt");
		target.HP-=strikedmg;
		target.SayName();
	}
}
do
{
	var elfcount=0,orkcount=0,humancount=0,dwarfcount=0;
	for (var i=0;i<count;i++)
	{
		rand=Math.round(Math.random()*3)+1;
		switch (rand)
		{
		case 1:
			{	
				elfcount++;
				Battle[i]=new Fighter("Elf"+(elfcount),"elf",ElfHpSr,ElfDmgSr);
				break;
			}
		case 2:
			{	
				orkcount++;
				Battle[i]=new Fighter("Ork"+(orkcount),"ork",OrkHpSr,OrkDmgSr);
				break;
			}	
		case 3:
			{	
				humancount++;
				Battle[i]=new Fighter("Human"+(humancount),"human",HumanHpSr,HumanDmgSr);
				break;
			}
		case 4:
			{	
				dwarfcount++;
				Battle[i]=new Fighter("Dwarf"+(dwarfcount),"dwarf",DwarfHpSr,DwarfDmgSr);
				break;
			}		
		};
	}
	var check=0;
	if (humancount>0)
		check++;
	if (orkcount>0)
		check++;
	if (elfcount>0)
		check++;
	if (dwarfcount>0)
		check++;
}
while(check===1);
//console.log(humancount,elfcount,orkcount);
console.log("H.E.O.D.:",humancount,elfcount,orkcount,dwarfcount);
do
{
	killer=Math.round(Math.random()*(Battle.length-1));
	do
		prey=Math.round(Math.random()*(Battle.length-1));
	while ((killer===prey)||(Battle[killer].Type===Battle[prey].Type));
	Battle[killer].Fight(Battle[prey]);
	if (Battle[prey].HP<=0)
	{
		console.log(Battle[prey].Name,"is dead!");
		if (Battle[prey].Type==="elf")
				elfcount--;
		if (Battle[prey].Type==="human")
				humancount--;
		if (Battle[prey].Type==="ork")
				orkcount--;
		if (Battle[prey].Type==="dwarf")
				dwarfcount--;
		Battle.splice(prey,1);
	}
	else
	{
		Battle[prey].Fight(Battle[killer]);
		if (Battle[killer].HP<=0)
		{
			console.log(Battle[killer].Name,"is dead!");
			if (Battle[killer].Type==="elf")
				elfcount--;
			if (Battle[killer].Type==="human")
				humancount--;
			if (Battle[killer].Type==="ork")
				orkcount--;
			if (Battle[killer].Type==="dwarf")
				dwarfcount--;
			Battle.splice(killer,1);
		}
	}
	console.log("-----");
	check=0;
	if (humancount>0)
		check++;
	if (orkcount>0)
		check++;
	if (elfcount>0)
		check++;
	if (dwarfcount>0)
		check++;
	console.log("H.E.O.D.:",humancount,elfcount,orkcount,dwarfcount);
}
while(check>1);
if (humancount>0)
	console.log("HUMAN MFAEDFWFEFW");
if (orkcount>0)
	console.log("ORK EPIC WIN!!!");
if (elfcount>0)
	console.log("Elf VICTORY >_<");
if (dwarfcount>0)
	console.log("DWARF IS FANTAEAFAE");


