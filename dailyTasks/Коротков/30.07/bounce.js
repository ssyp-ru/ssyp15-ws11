var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, 500, 500);
ctx.lineWidth = 1;
ctx.strokeStyle = "black";



var rand = function (upper) {
	return (Math.round(Math.random() * upper));
}


//Шарики:
var Ball = function (x, y, color, r) {
	this.x = x;
	this.y = y;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.color = color;
	this.r = r;
};

var arr = [];

var score = 0;
var stop = false;
var i;
var j;

function isBad (nb) {
	for (j = 0; j < arr.length; j++) {
		if (Math.abs (nb.x - arr[j].x) < nb.r + arr[j].r + 5 && Math.abs (nb.y - arr[j].y) < nb.r + arr[j].r + 5) return true;
	}
}

function enem () {
	for (i = 0; i < 10; i++) {

		var newBall = new Ball (rand(450) + 25, rand(450) + 25, "#" + (rand(899999) + 100000), rand(6) + 7);

		while (isBad(newBall) === true || Math.abs(newBall.x - canvas.width / 2) < 100 && Math.abs(newBall.y - canvas.height / 2) < 100) {
			newBall.x = rand(450) + 25;
			newBall.y = rand(450) + 25;
		}
		arr.push(newBall);
	}
}
enem();


setInterval(function () {
	for (i = 0; i < arr.length; i++) {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(arr[i].x, arr[i].y, arr[i].r + 2, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.fillStyle = arr[i].color;

		ctx.beginPath();
		arr[i].x += arr[i].xSpeed;
		arr[i].y += arr[i].ySpeed;
		ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();

		if (arr[i].x + arr[i].xSpeed + arr[i].r > canvas.width || arr[i].x + arr[i].xSpeed - arr[i].r < 0) arr[i].xSpeed = -arr[i].xSpeed;
		if (arr[i].y + arr[i].ySpeed + arr[i].r > canvas.height || arr[i].y + arr[i].ySpeed - arr[i].r < 0) arr[i].ySpeed = -arr[i].ySpeed;

		for (var u = 0; u < arr.length; u++) {
			var a = Math.abs((arr[i].x + arr[i].xSpeed) - (arr[u].x + arr[u].xSpeed));
			var b = Math.abs((arr[i].y + arr[i].ySpeed) - (arr[u].y + arr[u].ySpeed));
			if (u !== i) {
				var minS = arr[i].r + arr[u].r;
				if (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) < minS) {
					var xs = arr[i].xSpeed;
					var ys = arr[i].ySpeed;
					arr[i].xSpeed = arr[u].xSpeed;
					arr[i].ySpeed = arr[u].ySpeed;
					arr[u].xSpeed = xs;
					arr[u].ySpeed = ys;
				}
			}
		}

		if (beginned === true && stop === false) {
			if (arr[i].xSpeed < 0) arr[i].xSpeed -= 1 / 360; else arr[i].xSpeed += 1 / 360;
			if (arr[i].ySpeed < 0) arr[i].ySpeed -= 1 / 360; else arr[i].ySpeed += 1 / 360;
		}
		if (stop === true) {
			if (arr[i].xSpeed < 0) arr[i].xSpeed += 1 / 30; else arr[i].xSpeed -= 1 / 30;
			if (arr[i].ySpeed < 0) arr[i].ySpeed += 1 / 30; else arr[i].ySpeed -= 1 / 30;
		}
	}
}, 1000/60);



var beginned = false;

function start () {
	if (beginned === false) {
		for (i = 0; i < arr.length; i++) {
			arr[i].xSpeed = rand(20) - 10;
			arr[i].ySpeed = rand(20) - 10;
			beginned = true;
		}
	}
}



var nickname = prompt("Введите название шарика");
var fill = prompt("Выберите цвет шарика");

var Character = function (name, color) {
	this.isAlive = true;
	this.x = canvas.width / 2;
	this.y = canvas.height / 2;
	this.r = 10;
	this.name = name;
	this.color = color;
	this.wayToGo = 0;
}

var me = new Character(nickname, fill);



function move () {
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(me.x, me.y, me.r + 2, 0, 2 * Math.PI, false);
	ctx.fill();

	if (me.wayToGo === 1 && me.x - me.r - 5 > 0) me.x -= 5;
	if (me.wayToGo === 2 && me.y - me.r - 5 > 0) me.y -= 5;
	if (me.wayToGo === 3 && me.x + me.r + 5 < canvas.width) me.x += 5;
	if (me.wayToGo === 4 && me.y + me.r + 5 < canvas.height) me.y += 5;

	ctx.fillStyle = me.color;
	ctx.beginPath();
	ctx.arc(me.x, me.y, me.r, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();
	ctx.font = "normal 3em Corbel";
	ctx.filStyle = "black";
	//ctx.strokeText ("Score: " + score, 0, 50);
	ctx.fillText ("Score: " + score, 0, 50);
	ctx.fillStyle = "white";
}

function collision () {
	for (var u = 0; u < arr.length; u++) {
		var a = Math.abs(me.x - (arr[u].x + arr[u].xSpeed));
		var b = Math.abs(me.y - (arr[u].y + arr[u].ySpeed));
		var minS = me.r + arr[u].r;
		if (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) < minS) {
			arr[u].xSpeed = -arr[u].xSpeed;
			arr[u].ySpeed = -arr[u].ySpeed;
			ctx.fillStyle = "white";
			ctx.beginPath();
			ctx.arc(me.x, me.y, me.r + 2, 0, 2 * Math.PI, false);
			ctx.fill();
			me.r -= arr[u].r;
		}
		if (me.r <= 0) {
			me.isAlive = false
			stop = true;
		} 
	}
}

setInterval (function () {if (me.isAlive === true) {move(); collision(); if (beginned === true) me.r += 0.02; score++}}, 1000 / 60);

onkeydown = function () {
	if (event.which === 37)	{start(); me.wayToGo = 1}
	if (event.which === 38)	{start(); me.wayToGo = 2}
	if (event.which === 39)	{start(); me.wayToGo = 3}
	if (event.which === 40)	{start(); me.wayToGo = 4}
}

onkeyup = function () {
	me.wayToGo = 0;
}

function restart () {
	beginned = false;
	stop = false;
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	arr.splice(0, arr.length);
	enem();
	me.wayToGo = 0;
	me.isAlive = true;
	me.x = canvas.width / 2;
	me.y = canvas.height / 2;
	me.r = 10;
}