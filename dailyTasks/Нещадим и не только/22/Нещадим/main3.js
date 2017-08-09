a=new Array(Math.round(Math.random()*10));
for(var i=0;i< a.length;i++)
a[i]=Math.round(Math.random()*1000);
console.log((a));
var b=[];
if(a.length>4)
{
    b= b.concat( a.slice(0,2));
    b= b.concat(a.slice(a.length-2));
}
else
b=a;
console.log(b);


