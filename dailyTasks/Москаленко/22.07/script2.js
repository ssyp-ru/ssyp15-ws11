var f = function() {};
var A = [10, "abc", f];
var B = [];

	for (i = 0; i<3; i++) {
		if(typeof(A[i]) === "number")
		A[i]=A[i]*A[i]; }
	for (i = 0; i<3; i++) {
		if(typeof(A[i]) === "string")
		B = B.reverse();
		B}
	for (i = 0; i<3; i++) {
		if(typeof(A[i]) === "function")
		console.log(A[i]); }
console.log(A);