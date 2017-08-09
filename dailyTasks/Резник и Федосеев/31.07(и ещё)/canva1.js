var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var points = [];
var koef = 0.7;
var tabX = 10;
var tabY = 10;

function initPoints(){
	points["soccer"] = new Point(850 * koef + tabX, 650 * koef + tabY);
	points["square"] = new Point(1250 * koef + tabX, 400 * koef + tabY);
	points["mainHouse"] = new Point(1250 * koef + tabX, 200 * koef + tabY);
	points["pool"] = new Point(900 * koef + tabX, 0 * koef + tabY);
	points["shop"] = new Point(0 * koef + tabX, 650 * koef + tabY);
	points["workshops"] = new Point(100 * koef + tabX, 50 * koef + tabY);
	points["canteen"] = new Point(700 * koef + tabX, 150 * koef + tabY);
	points["n1"] = new Point(150 * koef + tabX, 250 * koef + tabY);
	points["n2"] = new Point(750 * koef + tabX, 250 * koef + tabY);
	points["n3"] = new Point(850 * koef + tabX, 300 * koef + tabY);
	points["gate"] = new Point(50 * koef + tabX, 550 * koef + tabY);
}
function map() {
	ctx.beginPath();
	ctx.lineWidth = 6;
	ctx.strokeStyle = "#000000";
	ctx.moveTo(150 * koef + tabX, 250 * koef + tabY);//going to перекрёсток 1
	ctx.lineTo(50 * koef + tabX, 550 * koef + tabY);//gate
	ctx.lineTo(0 * koef + tabX, 650 * koef + tabY);//shop
	ctx.moveTo(150 * koef + tabX, 250 * koef + tabY);//going to перекрёсток 1
	ctx.lineTo(100 * koef + tabX, 50 * koef + tabY);// workshops
	ctx.moveTo(150 * koef + tabX, 250 * koef + tabY);//going to перекрёсток 1
	ctx.lineTo(750 * koef + tabX, 250 * koef + tabY); // перекрёсток 2
	ctx.lineTo(700 * koef + tabX, 150 * koef + tabY);// canteen
	ctx.moveTo(750 * koef + tabX, 250 * koef + tabY);// going to перекрёсток 2
	ctx.lineTo(850 * koef + tabX, 300 * koef + tabY);// перекрёсток 3
	ctx.lineTo(900 * koef + tabX, 0 * koef + tabY);//pool
	ctx.moveTo(850 * koef + tabX, 300 * koef + tabY);// going to перекрёсток 3
	ctx.lineTo(1250 * koef + tabX, 400 * koef + tabY);//square
	ctx.lineTo(1250 * koef + tabX, 200 * koef + tabY);//mainhouse
	ctx.moveTo(1250 * koef + tabX, 400 * koef + tabY);//going to square
	ctx.lineTo(850 * koef + tabX, 650 * koef + tabY);//soccer
	ctx.closePath();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle = "#FF0000";
	ctx.fillStyle = "#FF0000";
	ctx.arc(850 * koef + tabX, 650 * koef + tabY, 5  * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(1250 * koef + tabX, 200 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(1250 * koef + tabX, 400 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(850 * koef + tabX, 300 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(900 * koef + tabX, 0 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(750 * koef + tabX, 250 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(700 * koef + tabX, 150 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(150 * koef + tabX, 250 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(0 * koef + tabX, 650 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(100 * koef + tabX, 50 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(50 * koef + tabX, 550 * koef + tabY, 5 * koef, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}
initPoints();
function Point(x,y){
	this.x = x;
	this.y = y;
}
function getPos(start, finish, distance){
	return new Point(points[start].x + (distance / Math.sqrt((points[finish].x-points[start].x)*(points[finish].x-points[start].x)+(points[finish].y-points[start].y)*(points[finish].y-points[start].y)))*(points[finish].x-points[start].x), points[start].y + (distance / Math.sqrt((points[finish].x-points[start].x)*(points[finish].x-points[start].x)+(points[finish].y-points[start].y)*(points[finish].y-points[start].y)))*(points[finish].y-points[start].y));
}
map();
function drawPlayer(start, finish, distance, color){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	map();
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	//console.log(start, finish, distance, color);
	if((start === null)&&(finish !== null)){
		ctx.arc(points[finish].x, points[finish].y, 10 * koef, 0, 2 * Math.PI, false);
	}
	else if((start !== null)&&(finish === null)){
		ctx.arc(points[start].x, points[start].y, 10 * koef, 0, 2 * Math.PI, false);
	}
	else{
		ctx.arc(getPos(start, finish, distance).x, getPos(start, finish, distance).y, 10 * koef, 0, 2 * Math.PI, false);
	}
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}
//drawPlayer("square", "soccer", 50, "#FF00FF");