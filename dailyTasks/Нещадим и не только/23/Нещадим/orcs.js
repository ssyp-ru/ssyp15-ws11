function Spell(name, cost, cooldownTime, action,value, cd) {
    this.name=name;
    this.cost = cost;
    this.cooldownTime = cooldownTime;
    this.action = action;
    this.value=value;
    if (!cd)
        this.cd = 0;
    else
        this.cd = cd
}
function AttackModifire(name,chance,action)
{
    this.name=name;
    this.chance=chance;
    this.action=action;
}
function Creature(name, hp, mp, power) {
    this.name = name;
    this.hp = hp;
    this.maxHp=hp;
    this.power = power;
    this.mp = mp;
    this.enemy=null;
   // this.spells=[];
}
function Dog(name, hp, mp, power)
{
    Creature.call(this, name, hp, mp, power);
    this.race = "Pet";
}
Dog.prototype=new Creature();
Dog.prototype.attack=function(a)
{
    //console.log("собака атаковала");
    a.addDamage(this.power);
}
function Orc(name, hp, mp, power) {
    Creature.call(this, name, hp, mp, power);
    this.race = "Orc";

}
function Human(name, hp, mp, power) {
    Creature.call(this, name, hp, mp, power);
    this.race = "Human";

}
Creature.prototype.reduceCds=function()
{
    for(var i=0;i<this.spells.length;i++)
    {
        if(this.spells[i].cd)
        this.spells[i].cd-=1;
    }
}
//Creature.prototype.spells=[];
Creature.prototype.attack = function (a) {
    for(var i=0;i<this.pets.length;i++)
    {
        this.pets[i].attack(a);
    }
    if(this.pets.length)
    console.log("собаки атаковали(x"+this.pets.length+")");

    this.reduceCds();
    var max=-1,ind=-1;

    for(var i=0;i<this.spells.length;i++)
    {
        if(this.spells[i].value.call(this) > max && this.spells[i].cd<=0)
        {
            //console.log(this.spells[i]);
            max=this.spells[i].value.call(this);
            ind=i;
        }
    }
   // console.log(max+" "+ind);
    if(max>0)
    {
        console.log("использовал "+this.spells[ind].name);
        this.spells[ind].action.call(this);
        this.spells[ind].cd=this.spells[ind].cooldownTime;
    }

    else {

        console.log("атаковал" );
        if(this.attackModifires.length>0)
        {
            var r=Math.random();
           // console.log(r>1-this.attackModifires[0].chance);
            //console.log(1-this.attackModifires[0].chance);
            if(r>1-this.attackModifires[0].chance)
            {
                console.log("Кританул");
                this.attackModifires[0].action.call(this);
            }
            else

                a.addDamage(this.power);
        }

    }
}
Creature.prototype.addDamage = function (t) {
    this.hp -= t;

}
Creature.prototype.isDead = function () {
    return this.hp <= 0;
}
Creature.prototype.toString = function () {
    return "Name: " + this.name + "|Race: " + this.race + "|HP " + this.hp + "|MP: " + this.mp + "|Power: " + this.power;

}

Creature.prototype.fight = function (b) {

    var count = 1;
    this.enemy=b;
    b.enemy=this;
    console.log("****Начат бой между " + this.toString() + " и " + b.toString() + "****");
    while (!(this.isDead() || b.isDead())) {

        var tek_f;
        if (count % 2 == 1)
           tek_f=this;
        else
            tek_f=b;
        console.log();
        console.log("Ход №"+count+" атакует-   "+tek_f.toString());


        if (count % 2 == 1)
            this.attack(b);
        else
            b.attack(this);

        count++;
    }
    console.log("*************************************");
    if (this.isDead())
        console.log(this.race+ " умер");
    else
        console.log(b.race+ " умер");
}

Orc.prototype = new Creature();
Human.prototype = new Creature();
Orc.prototype.pets=[];
Human.prototype.pets=[];
Orc.prototype.spells=[];
Human.prototype.spells=[];
Orc.prototype.attackModifires=[];
Dog.prototype.spells=[];
Dog.prototype.attackModifires=[];
Human.prototype.attackModifires=[];
Orc.prototype.spells.push(new Spell("Лечение",10,5,function(){if(this.maxHp-this.hp>20) this.hp+=20;else this.hp=this.maxHp; },function(){    if(this.enemy.power>this.hp) return 3; if(this.hp<this.maxHp/2) return 2 ;return 0}));
Orc.prototype.attackModifires.push(new AttackModifire("Критический удар",0.2,function(){ this.enemy.addDamage(this.power*2.5)}));
Human.prototype.spells.push(new Spell("Призвать собаку",20,20,function(){this.pets.push(new Dog("Собака",2,0,1.5)) },function(){return 4}));

//console.log(Orc.prototype.attackModifires);

var creatures = [];
for (var i = 0; i < 100; i++) {
    if (i % 2 === 1)
        creatures.push(new Orc("name" + i, i+1000, 100, 5));
    else
        creatures.push(new Human("name" + i, i+1000, 100, 3));
}
var orc1, orc2;
orc1 = creatures[Math.round(Math.random() * 100)];
orc2 = creatures[Math.round(Math.random() * 100)];

while (orc1.race === orc2.race) {
    orc2 = creatures[Math.round(Math.random() * 100)];
}

orc1.fight(orc2);
console.log();


