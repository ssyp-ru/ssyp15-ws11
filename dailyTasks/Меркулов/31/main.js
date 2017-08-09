var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var FRAMEWIDTH  = 60;
var FRAMEHEIGHT = 60;

var GROUND = 100;

var Sprite = function(index, width, height, cur, frames, autoplay) {
    this.index = index;

    this.current   = cur;
    this.frames    = frames;
    this.autoplay  = autoplay;

    this.width  = width;
    this.height = height;

    this.draw = function(x, y) {
        var framex = this.current * FRAMEWIDTH + (this.current + 1) * 3;
        ctx.drawImage(document.images[this.index], framex, 3, FRAMEWIDTH, FRAMEHEIGHT, x + this.width / 2, y + this.height / 2, this.width, this.height);

        if(this.autoplay) {
            if(this.current < this.frames - 1) {
                this.current++;
            } else {
                this.current = 0;
            }
        }
    }
};

var Unit = function(x, y, width, height, speed, jumpspeed, index, cur, frames, autoplay) {
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;

    this.speed  = speed;
    this.jumpspeed = -jumpspeed;
    this.speedx = 0;
    this.speedy = 0;

    this.sprite = new Sprite(index, width, height, cur, frames, autoplay);

    this.draw = function() {
        this.sprite.draw(this.x, this.y);
    };

    this.moveLeft = function() {
        this.speedx = -this.speed;
    };

    this.moveRight = function() {
        this.speedx = this.speed;
    };

    this.jump = function() {
        this.speedy = this.jumpspeed;
    };

    this.reload = function() {
        if(this.y < GROUND) {
            this.speedy += 1;
        } else {
            this.speedy = 0;
        }


        this.x += this.speedx;
        this.y += this.speedy;

        if(this.speedx > 0) {
            if(this.sprite.current === 2) {
                this.sprite.current = 3;
            } else {
                this.sprite.current = 2;
            }
        } else if(this.speedx < 0) {
            if(this.sprite.current === 0) {
                this.sprite.current = 1;
            } else {
                this.sprite.current = 0;
            }
        } else {
            this.sprite.current = 4;
        }
    };
};

function clrScr() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var unit = new Unit(50, 50, FRAMEWIDTH, FRAMEHEIGHT, 5, 100, 1, 0, 5, false);

clrScr();
unit.reload();
unit.draw();

addEventListener("keypress", function(event) {
    if(event.charCode === 65 || event.charCode === 97) { //A
        unit.moveLeft();
    } else if(event.charCode === 68 || event.charCode === 100) { //D
        unit.moveRight();
    } else if(event.charCode === 87 || event.charCode === 119) { //W
        unit.jump();
    }
}, true);

setInterval(function() { //drawing
    clrScr();
    unit.reload();
    unit.draw();

    if(!onkeypress) {
        unit.speedx = 0;
    }
}, 100);