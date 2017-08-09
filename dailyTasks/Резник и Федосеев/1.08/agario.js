var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
var key = [];
var cells = [];
var exists = [];
for(var i = 0; i < numBalls; i++){
	exists.push(false);
}
var numBalls = 15;
var playerRadius = 8;
function rand(x){
	return Math.floor(Math.random()*x);
}
function cell(x, y, r, color, maxSpeed){
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
	this.speedX = 0;
	this.speedY = 0;
	this.maxSpeed = maxSpeed;
	this.draw = function(){
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
}
function dist(x1, y1, x2, y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
}
function Player(x, y, r, color, maxSpeed)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.maxSpeed = maxSpeed;
	this.speed = maxSpeed;
	this.color = color;
	this.draw = function(){
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
	move = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < numBalls; i++){
			var c = cells[i];
			c.speedX += rand(3) - 1;
			c.speedY += rand(3) - 1;
			c.speedX %= c.maxSpeed / c.r + 2;
			c.speedY %= c.maxSpeed / c.r + 2;
			c.x += c.speedX;
			c.y += c.speedY;
			if(c.x >= canvas.width)
				c.x = 1;
			if(c.x <= 0)
				c.x = canvas.width - 1;
			if(c.y >= canvas.height)
				c.y = 1;
			if(c.y <= 0)
				c.y = canvas.height - 1;
			c.draw();
		}
		if((player2.r > player1.r)&&(player2.r > player3.r)){
			if(player1.r > player3.r){
				player3.draw();
				player1.draw();
			}
			else{
				player3.draw();
				player1.draw();
			}
			player2.draw();
		}
		else if((player1.r > player2.r)&&(player1.r > player3.r)){
			if(player2.r > player3.r){
				player3.draw();
				player2.draw();
			}
			else{
				player2.draw();
				player3.draw();
			}
			player1.draw();
		}
		else{
			if(player1.r > player2.r){
				player2.draw();
				player1.draw();
			}
			else{
				player1.draw();
				player2.draw();
			}
			player3.draw();
		}
		function keysDown(e){
			var keynum;
			var keychar;
			if(window.event)
			{
				keynum = e.keyCode;
			}
			keychar = String.fromCharCode(keynum);
			key[keychar] = true;
			console.log(keychar, keynum);
				return true;
		}
		function keysUp(e){
			var keynum;
			var keychar;
			if(window.event)
			{
				keynum = e.keyCode;
			}
			keychar = String.fromCharCode(keynum);
			key[keychar] = false;
				return true;
		}
		onkeydown = function(){return keysDown(event)};
		onkeyup = function(){return keysUp(event)};
		if(key['W']){
			player1.y -= player1.speed;
		}
		if(key['S']){
			player1.y += player1.speed;
		}
		if(key['A']){
			player1.x -= player1.speed;
		}
		if(key['D']){
			player1.x += player1.speed;
		}
		if(key['&']){
			player2.y -= player2.speed;
		}
		if(key['(']){
			player2.y += player2.speed;
		}
		if(key['%']){
			player2.x -= player2.speed;
		}
		if(key['\'']){
			player2.x += player2.speed;
		}
		/*if(key['Q']){
			player1 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "blue", 100);
			clearInterval(interval);
		}*/
		if(key['P']){
			player2 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "purple", 100);
			clearInterval(interval);
		}
		if(key['Y']){
			player3.y -= player3.speed;
		}
		if(key['H']){
			player3.y += player3.speed;
		}
		if(key['G']){
			player3.x -= player3.speed;
		}
		if(key['J']){
			player3.x += player3.speed;
		}
		if(player1.x >= canvas.width)	player1.x = 1;
		if(player1.x <= 0)				player1.x = canvas.width - 1;
		if(player1.y >= canvas.height)	player1.y = 1;
		if(player1.y <= 0)				player1.y = canvas.height - 1;
		
		if(player2.x >= canvas.width)	player2.x = 1;
		if(player2.x <= 0)				player2.x = canvas.width - 1;
		if(player2.y >= canvas.height)	player2.y = 1;
		if(player2.y <= 0)				player2.y = canvas.height - 1;
		
		if(player3.x >= canvas.width)	player3.x = 1;
		if(player3.x <= 0)				player3.x = canvas.width - 1;
		if(player3.y >= canvas.height)	player3.y = 1;
		if(player3.y <= 0)				player3.y = canvas.height - 1;
			
		player1.speed = player1.maxSpeed / player1.r + 3;
		player2.speed = player2.maxSpeed / player2.r + 3;
		player3.speed = player3.maxSpeed / player3.r + 3;
		//meeting
		for(var i = 0; i < numBalls; i++){
			exists[i] = true;
		}
		//player1 eat cells
		for(var i = 0; i < numBalls; i++){
			//exists[i] = true;
			if((dist(player1.x, player1.y, cells[i].x, cells[i].y) <= player1.r)&&(player1.r > cells[i].r)&&(exists[i])){
				exists[i] = false;
				player1.r = Math.sqrt(player1.r*player1.r + cells[i].r*cells[i].r);
			}
		}
		//cell eat player1
		for(var i = 0; i < numBalls; i++){
			if((dist(player1.x, player1.y, cells[i].x, cells[i].y) <= cells[i].r)&&(player1.r < cells[i].r)&&(exists[i])){
				player1 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "blue", 100);
				cells[i].r = Math.sqrt(player1.r*player1.r + cells[i].r*cells[i].r);
				if(cells[i].r > 500)
					cells[i].r = 500;
				clearInterval(interval);
				break;
			}
		}
		//player2 eat cells
		for(var i = 0; i < numBalls; i++){
			//exists[i] = true;
			if((dist(player2.x, player2.y, cells[i].x, cells[i].y) <= player2.r)&&(player2.r > cells[i].r)&&(exists[i])){
				exists[i] = false;
				player2.r = Math.sqrt(player2.r*player2.r + cells[i].r*cells[i].r);
			}
		}
		//cell eat player2
		for(var i = 0; i < numBalls; i++){
			if((dist(player2.x, player2.y, cells[i].x, cells[i].y) <= cells[i].r)&&(player1.r < cells[i].r)&&(exists[i])){
				player2 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "purple", 100);
				cells[i].r = Math.sqrt(player2.r*player2.r + cells[i].r*cells[i].r);
				if(cells[i].r > 500)
					cells[i].r = 500;
				clearInterval(interval);
				break;
			}
		}
		//player3 eat cells
		for(var i = 0; i < numBalls; i++){
			//exists[i] = true;
			if((dist(player3.x, player3.y, cells[i].x, cells[i].y) <= player3.r)&&(player3.r > cells[i].r)&&(exists[i])){
				exists[i] = false;
				player3.r = Math.sqrt(player3.r*player3.r + cells[i].r*cells[i].r);
			}
		}
		//cell eat player3
		for(var i = 0; i < numBalls; i++){
			if((dist(player3.x, player3.y, cells[i].x, cells[i].y) <= cells[i].r)&&(player3.r < cells[i].r)&&(exists[i])){
				player3 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "orange", 100);
				cells[i].r = Math.sqrt(player3.r*player3.r + cells[i].r*cells[i].r);
				if(cells[i].r > 500)
					cells[i].r = 500;
				clearInterval(interval);
				break;
			}
		}
		//cell eat cell
		for(var i = 0; i < numBalls; i++){
			for(var j = 0; j < numBalls; j++)
			{
				if((dist(cells[i].x, cells[i].y, cells[j].x, cells[j].y) <= cells[i].r)&&(cells[j].r < cells[i].r)&&(exists[i])&&(exists[j])&&(i !== j)){
					cells[i].r = Math.sqrt(cells[i].r*cells[i].r + cells[j].r*cells[j].r);
					exists[j] = false;
				}
				else if((dist(cells[i].x, cells[i].y, cells[j].x, cells[j].y) <= cells[j].r)&&(cells[i].r < cells[j].r)&&(exists[i])&&(exists[j])&&(i !== j)){
					cells[j].r = Math.sqrt(cells[i].r*cells[i].r + cells[j].r*cells[j].r);
					exists[i] = false;
				}
				if(cells[i].r > 500)
					cells[i].r = 500;
				if(cells[j].r > 500)
					cells[j].r = 500;
			}
		}
		//spawn eaten cells
		for(var i = 0; i < numBalls; i++){
			if(!exists[i])
				cells[i] = new cell(rand(canvas.width), rand(canvas.height), Math.sqrt(rand(2000) + 5)/Math.PI, "#" + symbols[rand(16)]+symbols[rand(16)]+symbols[rand(16)]+symbols[rand(16)]+symbols[rand(16)]+symbols[rand(16)], 10);
		}
		//player eat player
		if((player1.r > player2.r)&&(dist(player1.x, player1.y, player2.x, player2.y) <= player1.r)){
			player2 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "purple", 100);
			player1.r = Math.sqrt(player1.r*player1.r + player2.r*player2.r);
			clearInterval(interval);
		}
		else if((player2.r > player1.r)&&(dist(player1.x, player1.y, player2.x, player2.y) <= player2.r)){
			player1 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "blue", 100);
			player2.r = Math.sqrt(player1.r*player1.r + player2.r*player2.r);
			clearInterval(interval);
		}
		if((player1.r > player3.r)&&(dist(player1.x, player1.y, player3.x, player3.y) <= player1.r)){
			player3 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "orange", 100);
			player1.r = Math.sqrt(player1.r*player1.r + player3.r*player3.r);
			clearInterval(interval);
		}
		else if((player3.r > player1.r)&&(dist(player1.x, player1.y, player3.x, player3.y) <= player3.r)){
			player1 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "blue", 100);
			player3.r = Math.sqrt(player1.r*player1.r + player3.r*player3.r);
			clearInterval(interval);
		}
		if((player2.r > player3.r)&&(dist(player2.x, player2.y, player3.x, player3.y) <= player2.r)){
			player3 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "orange", 100);
			player2.r = Math.sqrt(player2.r*player2.r + player3.r*player3.r);
			clearInterval(interval);
		}
		else if((player3.r > player2.r)&&(dist(player2.x, player2.y, player3.x, player3.y) <= player3.r)){
			player2 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "purple", 100);
			player3.r = Math.sqrt(player2.r*player2.r + player3.r*player3.r);
			clearInterval(interval);
		}
		
		if(player1.r > 200){
			player1.r = Math.sqrt((player1.r*player1.r*Math.PI - 0.3)/Math.PI);
		}
		if(player2.r > 200){
			player2.r = Math.sqrt((player2.r*player2.r*Math.PI - 0.3)/Math.PI);;
		}
		if(player3.r > 200){
			player3.r = Math.sqrt((player3.r*player3.r*Math.PI - 0.3)/Math.PI);;
		}
		if(player1.r > 900){
			confirm("Голубой победил");
		}
		if(player2.r > 900){
			confirm("Фиолетовый победил");
		}
		if(player3.r > 900){
			confirm("Оранжевый победил");
		}
	}
	var interval = setInterval(move, 1000/30);
}
player1 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "blue", 10);
player2 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "purple", 10);
player3 = new Player(rand(canvas.width), rand(canvas.height), playerRadius, "orange", 10);
var symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
for(var i = 0; i < numBalls; i++)
	cells.push(new cell(rand(canvas.width), rand(canvas.height), Math.sqrt(rand(2000) + 5)/Math.PI, "#" + symbols[rand(16)]+symbols[rand(16)]+symbols[rand(16)]+symbols[rand(16)]+symbols[rand(16)]+symbols[rand(16)], 10));