console.clear();
var mobs = [];
var alive = {Elf:0, Hobbit:0, Gollum:0, Boss:0, Man:0};
var a = 0, b = 0
var makeMob = function(name, mobsClass, minDamage,maxDamage, hp)
{
	this.name = name;
	this.minDamage = minDamage;
	this.maxDamage = maxDamage;
	this.hp = hp;
	this.mobsClass = mobsClass;
	this.wins = 0;
	this.damage = 0;
	this.ultimate = 0;
	alive[mobsClass]++;
}
var DiedClasses = function()
{
	var count = 0;
		if(alive["Elf"] === 0)
			count++;
		if(alive["Hobbit"] === 0)
			count++;
		if(alive["Gollum"] === 0)
			count++;
		if(alive["Man"] === 0)
			count++;
		if(alive["Boss"] === 0)
			count++;
	return count;
}
var rand = function(x)
{
	return Math.floor(Math.random()*x);
}
for(var i = 0; i < 20; i++)
{
	mobs.push(new makeMob("Elf#"+i.toString(), "Elf", 60, 75, rand(20)+50));
	mobs.push(new makeMob("Gollum#"+i.toString(), "Gollum", 20, 50, rand(20)+90));
	mobs.push(new makeMob("Hobbit#"+i.toString(), "Hobbit", 30, 55, rand(20)+80));
	mobs.push(new makeMob("Man#"+i.toString(), "Man", 15, 30, rand(20)+120));
}
mobs.push(new makeMob("Boss1", "Boss", 50, 100, 330 + rand(200)));
mobs.push(new makeMob("Boss2", "Boss", 50, 100, 300 + rand(200)));
//mobs.push(new makeMob("Boss3", "Boss", 50, 100, 500));
console.log(alive);
while(true)
{
	//ВРАЧ
	
	a = rand(mobs.length);
	while(mobs[a].hp <= 0)
	{
		a = rand(mobs.length);
	}
	mobs[a].hp += 10;
	
	//ВРАЧ
	if(DiedClasses() === 1)
		break;
	a = rand(mobs.length);
	b = rand(mobs.length);
	while(mobs[a].hp <= 0)
	{
			a = rand(mobs.length);
	}
	while((b === a)||(mobs[a].mobsClass === mobs[b].mobsClass)||(mobs[b].hp <= 0))
	{
			b = rand(mobs.length);
	}
	var prevhp = mobs[b].hp;
	if(rand(5) === 3)
	{
		mobs[b].hp -= mobs[a].minDamage + (rand(mobs[a].maxDamage - mobs[a].minDamage + 1))*3;
		mobs[a].damage += mobs[a].minDamage + (rand(mobs[a].maxDamage - mobs[a].minDamage + 1))*3;
		mobs[a].ultimate++;
	}  
	else
	{
		mobs[b].hp -= mobs[a].minDamage + rand(mobs[a].maxDamage - mobs[a].minDamage + 1);
		mobs[a].damage += mobs[a].minDamage + rand(mobs[a].maxDamage - mobs[a].minDamage + 1);
	}
	if(mobs[b].hp <= 0)
	{
		mobs[a].wins++;
		alive[mobs[b].mobsClass]--;
	}
	console.log(mobs[a].name, mobs[b].name, prevhp, mobs[b].hp);
	console.log(alive);
}
console.log(mobs);
