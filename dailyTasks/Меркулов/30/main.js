var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var FRAMEWIDTH  = 20;
var FRAMEHEIGHT = 20;

var Sprite = function(img, width, height, cur, frames, autoplay) {
    this.image = img;
    this.current = cur;
    this.frames  = frames;
    this.autoplay = autoplay;

    this.width  = width;
    this.height = height;

    var framex = this.current * FRAMEWIDTH + this.current + 1;

    this.draw = function(x, y) {
        ctx.drawImage(this.img, framex, 1, FRAMEWIDTH, FRAMEHEIGHT, x + this.width / 2, y + this.height / 2, this.width, this.height);

        if(this.autoplay) {
            if(this.current < this.frames - 1) {
                this.current++;
            } else {
                this.current = 0;
            }
        }
    }
};

var img = new Image();
img.src = "sprites/sprite_1.png";

var sprite = new Sprite(img, 100, 100, 0, 4, false);

sprite.draw();
