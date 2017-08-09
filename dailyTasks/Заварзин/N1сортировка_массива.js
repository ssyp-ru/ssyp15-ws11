var a=[],size=Math.round(Math.random()*100)+2;
for (var i=0;i<size;i++)
{
	a[i]=Math.round(Math.random()*100);
	console.log(a[i]);
}
console.log("sorted");
for (i=0;i<a.length;i++)
	for (var j=0;j<a.length-1;j++)
		if (a[j]>a[j+1])
		{
			a[j]=a[j]+a[j+1];
			a[j+1]=a[j]-a[j+1]
			a[j]=a[j]-a[j+1];
		}
console.log(a);
