var winner;
var turn_c = 1;
const h = 3;
const w = 3;

var draw_d_array = function (a) {
    for (var i = 0; i < h; i++) {
        console.log(a[i]);
        //console.log();
    }
}

var all_elment_equals = function (a) {
    var b = true;
    for (var i = 0; i < a.length - 1; i++) {
        b = (a[i] === a[i + 1]);
        if (!b) break;
    }
    //console.log(a);
    //console.log(b);
    return b;
}

var has_winner = function (a) {
    for (var i = 0; i < h; i++) {
        if (all_elment_equals(a[i])) {
            if (a[i][0] != 0)
                return a[i][0];

        }


    }
    for (var i = 0; i < h; i++) {
        var b = [];

        for (var j = 0; j < h; j++) {

            b.push(a[j][i]);

        }

//        console.log("b= ");
        //      console.log(b);
        if (all_elment_equals(b)) {
            if (b[0] != 0)
                return b[0];

        }

    }
    var b = [];
    for (var i = 0; i < h; i++) {
        b.push(a[i][i]);

    }
    if (all_elment_equals(b)) {
        if (b[0] != 0)
            return b[0];
    }
    b = [];
    for (var i = 0; i < h; i++) {
        b.push(a[h - i - 1][i]);

    }
    if (all_elment_equals(b)) {
        if (b[0] != 0)
            return b[0];

    }
}

var a = [];
for (var i = 0; i < h; i++) {
    a[i] = [];
    for (var j = 0; j < w; j++) {

        a[i][j] = 0;
    }
}

while (turn_c <= h * w) {
    console.log();
    console.log("ход номер " + turn_c);

    turn_c++;

    var x = Math.round(Math.random() * (w - 1));
    var y = Math.round(Math.random() * (h - 1));


    while (a[y][x] != 0) {
        x = Math.round(Math.random() * (w - 1));
        y = Math.round(Math.random() * (h - 1));
    }
    console.log("x- " + (x + 1));
    console.log("y- " + (y + 1));


    if (a[y][x] === 0)
        a[y][x] = (turn_c % 2) + 1;
    draw_d_array(a);
    winner = has_winner(a);

    if (winner) {
        console.log(winner + " выиграл");
        break;
    }
}
if (!winner)
    console.log("ничья");


