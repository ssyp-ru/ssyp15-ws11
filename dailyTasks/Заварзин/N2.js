function reverse(strin)
{
	var snew="";
	for (var i=strin.length-1;i>=0;i--)
		snew=snew+strin[i];
	console.log(snew);	
}
var obj=[5,"ssyp2015",function (){console.log("ff")}]
for (var j=0;j<obj.length;j++)
{
	if  (typeof(obj[j])==="number")
		console.log(obj[j]*obj[j]);
	if  (typeof(obj[j])==="string")
		reverse(obj[j]);
	if  (typeof(obj[j])==="function")
		obj[j]();
}
	

