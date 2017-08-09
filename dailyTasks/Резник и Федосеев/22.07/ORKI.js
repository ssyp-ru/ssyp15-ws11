console.clear();
var mobs = [];
var alive = [0, 0];
var a = 0, b = 0
var makeMob = function(name, mobsClass, minDamage,maxDamage, hp)
{
	this.name = name;
	this.minDamage = minDamage;
	this.maxDamage = maxDamage;
	this.hp = hp;
	this.mobsClass = mobsClass;
	this.wins = 0;
}
var DiedClasses = function()
{
	var count = 0;
	for(var i = 0; i < alive.length; i++)
	{
		if(alive[i] === 0)
			count++;
	}
	return count;
}
var rand = function(x)
{
	return Math.floor(Math.random()*x);
}
for(var i = 0; i < 10; i++)
{
	mobs.push(new makeMob("Elf#"+i.toString(), "Elf", 35, 60, rand(20)+50));
	mobs.push(new makeMob("Gollum#"+i.toString(), "Gollum", 20, 50, rand(20)+90));
	mobs.push(new makeMob("Hobbit#"+i.toString(), "Hobbit", 30, 55, rand(20)+65));
	alive[mobs[i].number_of_class]++;
}
//mobs.push(new makeMob("NuboDOKTOR228", "DOKTOR", -40, -20, 1000));
console.log(alive);
while(true)
{
	//ВРАЧ
	
	a = rand(mobs.length);
	while(mobs[a].hp <= 0)
	{
		a = rand(mobs.length);
	}
	mobs[a].hp *= 2;
	
	//ВРАЧ
	if(DiedClasses() === alive.length - 1)
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
	mobs[b].hp -= mobs[a].minDamage + rand(mobs[a].maxDamage - mobs[a].minDamage + 1);
	if(mobs[b].hp <= 0)
	{
		mobs[a].wins++;
		alive[mobs[b].mobsClass]--;
	}
	console.log(mobs[a].name, mobs[b].name, prevhp, mobs[b].hp);
}
console.log(mobs);
