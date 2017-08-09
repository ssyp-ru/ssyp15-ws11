var a;
var i;
var u;
var x = 100;
var A = [];
for (i = 0; i < Math.round(Math.random() * 15 + 5); i++) {
    A[i] = 0;
}
console.log ("Unsorted:");
for (i = 0; i < A.length; i++) {
    A[i] = Math.round(Math.random() * 99 + 1);
}
console.log (A);
console.log ("Sorted:");
for (u = 0; u < A.length; u++) {
    x = 100;
    for (i = 0; i < A.length; i++) {
        if (A[i] < x) {x = A[i]; a = i}
    }
    A[a] = 100;
    console.log (x);
}