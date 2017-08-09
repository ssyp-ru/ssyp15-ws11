var y;
var i;
var A = [];
var B = [];
y = Math.round(Math.random() * 10 + 5);
for (i = 0; i < y; i++) {
    A[i] = 0;
}
console.log ("Normal:");
for (i = 0; i < y; i++) {
    A[i] = Math.round(Math.random() * 99 + 1);
}
console.log (A);
console.log ("Reversed:");
for (i = 0; i < y; i++) {
    B.push (A.pop());
}
console.log (B);