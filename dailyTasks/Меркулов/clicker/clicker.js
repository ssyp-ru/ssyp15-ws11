var bg = 0;
var time = 1;
var speed = 0;
var clicks = 0;

var time_el = document.getElementById("time");
var speed_el = document.getElementById("speed");
var clicked = document.getElementById("clicked");
var body = document.getElementById("CLICKER");

function click() {
    var h_class;

    switch(bg) {
        case 0:
            h_class = "red";
            break;
        case 1:
            h_class = "blue";
            break;
        case 2:
            h_class = "yellow";
            break;
    }

   body.setAttribute("class", h_class);

    if(bg < 2) {
        bg++;
    } else {
        bg = 0;
    }

    clicks++;

    clicked.innerHTML = clicks;
}

window.addEventListener("mousedown", click, false);

setInterval(function() { //autoclick
    click();
}, 1);

setInterval(function() {
    time++;
    speed = clicks / time;
    time_el.innerHTML = "TIME:" + time;
    speed_el.innerHTML = "SPEED:" + speed.toFixed(2) + " c/s";
}, 1000);