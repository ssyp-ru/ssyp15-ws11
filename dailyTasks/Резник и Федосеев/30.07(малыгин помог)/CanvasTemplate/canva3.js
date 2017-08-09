var canvasBg = document.getElementById('canvasBg');
var canvas = document.getElementById('canvas');
var ctxBg = canvasBg.getContext('2d');
var ctx = canvas.getContext('2d');
ctxBg.clearRect(0, 0, canvasBg.height, canvasBg.width);
ctx.clearRect(0, 0, canvas.height, canvas.width);
function rand(x)
{
	return Math.floor(Math.random()*x);
}
function cell(x,y,r)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.draw = function()
	{
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#0000FF";
		ctx.fillStyle = "#0000FF"
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
	move = function()
	{
		ctx.clearRect(0, 0, canvas.height, canvas.width);
		for(var i = 0; i < 200; i++)
		{
			var c = cells[i];
			c.x += rand(11) - 5;
			c.y += rand(11) - 5;
			c.draw();
		}
	}
	setInterval(move, 1000/60);
}
ctxBg.beginPath();
ctxBg.lineWidth = 1;
ctxBg.strokeStyle = "#989681";
for(var i = 0; i < canvasBg.width/10; i++) {
	ctxBg.moveTo(i*10 + 0.5,0.5);
	ctxBg.lineTo(i*10, canvasBg.height);
}
for(var i = 0; i < canvasBg.height/10; i++) {
	ctxBg.moveTo(0.5, i*10 + 0.5);
	ctxBg.lineTo(canvasBg.width, i*10 + 0.5);
}
ctxBg.closePath();
ctxBg.stroke();
ctx.backgroundImage = ();
var cells = [];
for(var i = 0; i < 200; i++)
	cells.push(new cell(500, 500, 10));