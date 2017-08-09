


	ctx.beginPath();
	ctx.lineWidth = 6;
	ctx.strokeStyle = "#000000";
	ctx.moveTo(0, canvas.height);
	ctx.lineTo(canvas.width, canvas.height);
	ctx.lineTo(canvas.width, 0);
	ctx.stroke();
	ctx.closePath();
	
	




function map() {
	ctx.beginPath();
	ctx.lineWidth = 6;
	ctx.strokeStyle = "#000000";
	ctx.moveTo(200, 450);//going to перекрёсток 1
	ctx.lineTo(100, 750);//gate
	ctx.lineTo(50, 850);//shop
	ctx.moveTo(200, 450);//going to перекрёсток 1
	ctx.lineTo(150, 250);// workshops
	ctx.moveTo(200, 450);//going to перекрёсток 1
	ctx.lineTo(800, 450); // перекрёсток 2
	ctx.lineTo(750, 350);// canteen
	ctx.moveTo(800, 450);// going to перекрёсток 2
	ctx.lineTo(900, 500);// перекрёсток 3
	ctx.lineTo(950, 200);//pool
	ctx.moveTo(900, 500);// going to перекрёсток 3
	ctx.lineTo(1300, 600);//square
	ctx.lineTo(1300, 400);//mainhouse
	ctx.moveTo(1300, 600);//going to square
	ctx.lineTo(900, 850);//soccer
	ctx.closePath();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle = "#FF0000";
	ctx.fillStyle = "#FF0000";
	ctx.arc(900, 850, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(1300, 400, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(1300, 600, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(900, 500, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(950, 200, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(800, 450, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(750, 350, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(200, 450, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(50, 850, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(150, 250, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(100, 750, 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}
