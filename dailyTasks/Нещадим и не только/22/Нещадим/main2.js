var a=[25,30,11,128];
//a.push(2);
var b=[];
console.log( a);
var centr=Math.floor(a.length/2);
for (var i=0;i< Math.floor(a.length/2) ;i++)
{

    var first_el,last_el;
    first_el= a.slice(centr-i-1,centr-i);
    //console.log((first_el));
    last_el=a.slice(centr+i,centr+i+1);
  //  console.log((last_el));
    b.push(first_el[0]);
    b.unshift((last_el[0]));

}
console.log(b);
