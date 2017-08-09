var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, 300, 300);


// For now, set cell size explicitly, later
// we will calculate it based on device dimensions
var cellSize = 40;
ctx.beginPath();
//Drawing horizontal lines
for (var i = 0; i < 15; i++) {
    ctx.moveTo(i * cellSize + 0.5, 0);
    ctx.lineTo(i * cellSize + 0.5, cellSize * 12)
}
//Drawing vertical lines
for (var j = 0; j < 13; j++) {
	ctx.moveTo(0, j * cellSize + 0.5);
    ctx.lineTo(cellSize * 14, j * cellSize + 0.5);
}

// Stroking to show them on the screen
ctx.lineWidth = 1;
ctx.strokeStyle = "#989681";
ctx.stroke();

var data = [[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 2, 1, 0, 0], 
			[0, 0, 2, 1, 1, 2, 0]];
ctx.strokeStyle = "#000";
ctx.lineWidth = 3;
for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
        var value = data[i][j];
        if (!value)             continue;
        switch (value) {
            case 1:
                ctx.fillStyle = "red";
                break;
            case 2:
                ctx.fillStyle = "green";
                break;
        }
        ctx.beginPath();
        ctx.arc((j + 0.5) * cellSize, (i + 0.5) * cellSize, cellSize / 2 - 5, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }
}