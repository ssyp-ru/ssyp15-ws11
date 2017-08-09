var A = [];
var i, a;

for(i=0; i<10; i++)
	{A[i] = Math.round(Math.random()*100)};

console.log(A.sort(
	function(x, y){
		return x - y;
	}
	
));

/*
var b;
for(var i = 0;i<10;i++)
	for(var j = 0;j<9;j++)
		if(m[j + 1] < m[j])
		{
			b = m[j];
			m[j] = m[j + 1];
			m[j + 1] = b;
		}
*/