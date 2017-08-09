var m = [];
var i;
for(i = 0;i<10;i++){
m[i] = Math.round(Math.random() * 100);
}
console.log(m);
for(i = 0;i<10;i++){
	for(var j = 0; j<9; j++)
		if(m[j] > m[j+1]){
		var	n = m[j];
			m[j] = m[j+1];
			m[j+1] = n;
		}
}
console.log(m);