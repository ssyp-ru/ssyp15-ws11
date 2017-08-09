function Ball(radius,color){
	this.radius=radius;this.color=color;
	this.x=0;
	this.y=0;
	this.vx=0;
	this.vy=0;
	this.draw=function(context){
		context.fillStyle=this.color;
		context.beginPath();
		context.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
		context.closePath();
		context.fill();
	}
}
function init(){
	var radius = 10;
	var color = "red";
	balls = new Array();
	for (var i=0; i<10; i++){
		var ball = new Ball(radius, color);
		ball.x = 50;
		ball.y = 75;
		ball.vx = Math.random()*5;
		ball.vy = (Math.random()-0.5)*4;
		ball.draw(context);
		balls.push(ball);
	}
	function onEachStep() {
		var g = 9.8;
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < 10; i++){
			var ball = balls[i];
			ball.vy += g;
			ball.x += ball.vx;
			ball.y += ball.vy;
			if (ball.y > canvas.height - radius){
				ball.y = canvas.height - radius;
				ball.vy *= -1;
			}
			if (ball.x > canvas.width + radius){
				ball.x = -radius;
			}
			ball.draw(context);
		}
	};
	setInterval(onEachStep, 1000/60); // 60 fps 
}; 
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
init();