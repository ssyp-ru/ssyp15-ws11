var STARTHP      = 100;
var STARTDMG     = 5;
var STARTDEF     = 2;
var STARTLUCK    = 5;
var STARTHEALING = 10;

function random(i) {
    return Math.floor(Math.random * i);
}

var Unit = function() {
    this.xp  = 0;
    this.lvl = 0;

    this.hp_c   = STARTHP;
    this.def_c  = STARTDEF;
    this.hp  = STARTHP;
    this.def = STARTDEF;

    this.dmg     = STARTDMG;
    this.healing = STARTHEALING;
    this.luck    = STARTLUCK;

    this.hit = function() {
        return this.dmg + random(this.luck);
    };

    this.takeDmg = function(dmg) {
        if(this.def) {
            this.def--;
        } else {
            this.hp -= dmg;

            if(this.hp < 0) {
                this.hp = 0;
            }
        }
    };

    this.heal = function() {
        this.hp += this.healing;

        if(this.hp > this.hp_c) {
            this.hp = this.healing;
        }
    };

    this.fix = function() {
        if(this.hp) {
            this.hp  = this.hp_c;
            this.def = this.def_c;
        }
    };

    this.addXp = function(xp) {
        this.xp += xp;

        while(this.xp > this.lvl * 100) {
            this.lvl++;
            this.xp -= this.lvl * 100;
        }
    };

    /* */
    this.addHp = function() {

    };

    this.addDef = function() {

    };

    this.addDmg = function() {

    };

    this.addLuck = function() {

    };
};

var unit_1 = new Unit();
var unit_2 = new Unit();

var player = 0;

while(unit_1 > 0 || unit_2 > 0) {
    if(player === 0) {
        player = 1;
        unit
    } else {
        player = 0;

    }
}