var m = [];
for(var i = 0;i<10;i++)
	m[i] = Math.round(Math.random()*100-50);
console.log(m.sort(function(x,y){return Math.abs(x)-Math.abs(y)}));