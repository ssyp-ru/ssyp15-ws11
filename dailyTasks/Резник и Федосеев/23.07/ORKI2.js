console.clear();
var mobs = [];
function rand(x)
{
		return Math.floor(Math.random()*x);
}
function Creature(name, hp, mindmg, maxdmg)
{
	this.name = name;
	this.hp = hp;
	this.mindmg = mindmg;
	this.maxdmg = maxdmg;
}
	Human.prototype = new Creature();
	Hobbit.prototype = new Creature();
function Human(name, hp, mindmg, maxdmg)
{
	Creature.call(this, name, hp, mindmg, maxdmg);
	/*function Attack(target)
	{
		target.hp -= mindmg + (rand(maxdmg - mindmg));	
	}
	function Hill()
	{
		this.hp += (mindmg + (rand(maxdmg - mindmg)))/3;
	}*/
}
function Hobbit(name, hp, mindmg, maxdmg)
{
	Creature.call(this, name, hp, mindmg, maxdmg);
	/*function Attack(target)
	{
		if(rand(10) === 5)
		{
			target.hp -= (mindmg + (rand(maxdmg - mindmg)))*2;
		}
		target.hp -= mindmg + (rand(maxdmg - mindmg));
	}
	function Hill()
	{
		this.hp += (mindmg + (rand(maxdmg - mindmg)))/4;
	}*/
}
function CreateCreatures()
{
	mobs.push(new Human("Human#1", 110, 15, 40));
	mobs.push(new Hobbit("Hobbit#1", 100, 20, 40));
	return 0;
}
Human.prototype.Attack = function(target){target.hp -= this.mindmg + (rand(this.maxdmg - this.mindmg));}
Hobbit.prototype.Attack = function(target){
		if(rand(10) === 5)
		{
			target.hp -= (this.mindmg + (rand(this.maxdmg - this.mindmg)))*2;
		}
		target.hp -= this.mindmg + (rand(this.maxdmg - this.mindmg));
	}
CreateCreatures();
console.log(mobs);
//mobs[0].Attack(mobs[1]);
//mobs[1].Attack(mobs[0]);
console.log(mobs);