var x;
var i;
var A = [];
x = Math.round(Math.random() * 9 + 1);
for (i = 0; i < x; i++) {
    A[i] = 0;
}
console.log ("Normal:");
for (i = 0; i < x; i++) {
    A[i] = Math.round(Math.random() * 99 + 1);
}
console.log (A);
console.log ("Spliced:");
A.splice (2, x - 4);
console.log (A);