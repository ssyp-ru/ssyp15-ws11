var x;
var A = [];
x = Math.round(Math.random() * 9 + 1);
for (i = 0; i < x; i++) {
    A[i] = 0;
}
for (i = 0; i < x; i++) {
    A[i] = Math.round(Math.random() * 199 + 1 - 100);
}
console.log (A);
A.sort (function (x, y) {return Math.abs (y) - Math.abs (x)});
console.log (A);