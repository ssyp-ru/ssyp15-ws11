    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var arr = [];
    var Ball = function (radius, color, x, y, sx, sy) {
        this.radius = radius;
        this.color = color;
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
    };
    
    
    Ball.prototype.onEachStep = function () {
        this.y += this.sy;
        this.x += this.sx;

        if (this.x >= canvas.width - this.radius || this.x <= 0 + this.radius)
            this.sx = -this.sx;

        if (this.y >= canvas.height - this.radius || this.y <= 0 + this.radius)
            this.sy = -this.sy;

        for (var i = 0; i < arr.length; i++) {
            if (Collide(this, arr[i]))
            {
                this.sx = -this.sx;
                this.sy = -this.sy;
            }
        }
    };

    /// - arr[i].radius && this.y - this.radius === arr[i].y - arr[i].radius
    
    Ball.prototype.drawBall = function () {
        //clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    };

    function random6() {
        return ("#" + Math.floor(Math.random() * 1000000));
    };

    function randomSize() {
        var random = Math.round(Math.random() * 50);
        return (random);
    };

    function randomSpeed() {
        return (7-Math.random() * 15);
    }


    function f() {
       context.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < arr.length; i++) {
            arr[i].onEachStep();
            arr[i].drawBall();
        }
    } 


 
    //возвращает FALSE если шар вне канваса
    function checkInBox(b) {
        if(b.x < b.radius || b.y < b.radius
            || b.x > canvas.width - b.radius
            || b.y > canvas.height - b.radius)
            return false;
        else
            return true;
    };
    //возвращает TRUE если шары в1 и в2 пересекаются
    function Collide(b1, b2){
        if(b1 === b2)
            return false;
        else if(Math.sqrt(
                (b1.x - b2.x) * (b1.x - b2.x) 
                +
                (b1.y - b2.y) * (b1.y - b2.y)
                ) 
                < b1.radius + b2.radius)
            return true;
        else
            return false;
    };
    
    //возвращает TRUE если шар нам не подходит (пересекается с другими)
    function CollideAnyBall(b){
        for(i=0; i<arr.length; i++){
            if(Collide(b, arr[i]))
                return true;    
        }
        return false;
    };

    function init() {
        for (var i = 0; i < 50; i++) {
           //создаем новый шар
            var b = new Ball(randomSize(), random6(), Math.round(Math.random()*1300), Math.round(Math.random()*600), randomSpeed(), randomSpeed());
            //проверяем чтобы он был в канвасе а не снаружи и не перекрывался другими шарами
            while ( CollideAnyBall(b) || !checkInBox(b))
                //
                //console.log("bad");
                //b.x = Math.round(b.radius + Math.random()*100);
                //b.y = Math.round(b.radius + Math.random()*100);
                b = new Ball(randomSize(), random6(), Math.round(Math.random()*1300), Math.round(Math.random()*600), randomSpeed(), randomSpeed());
            arr.push(b);
        };
            setInterval(f, 1000 / 60); // 60 fps
    };

   window.onload = init;