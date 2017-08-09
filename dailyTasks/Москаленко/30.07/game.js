var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

with (context) {
    clearRect(0, 0, canvas.width, canvas.height);
    beginPath();
    arc(x, y, 100, 0, 2 * Math.PI, true);
};