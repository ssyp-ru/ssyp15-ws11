var reverseString=function ( str)
{
    if(typeof (str)==="string")
    {
        var m=[];

        for(var j=0;j<str.length;j++)
        {
            m[j] = str[j];
        }

        for(var i=0;i<Math.round( m.length/2);i++)
        {
            var n= m[i];
            m[i]= m[m.length-1-i];
            m[m.length-1-i]=n;
        }


        var st="";
        for(var i=0;i< m.length;i++)
            st+=m[i];
        return st;

    }

}
var a=[25,"string",function (a){if(typeof (a)==="number")return a*a; },"ab"];
console.log(a);

for(var i=0;i< a.length;i++ )
{
    switch (typeof( a[i]))
    {
        case "number":
            console.log(a[i]*a[i]+"- "+i+" ый элемент в квадрате ");
            break;
        case "string":
            console.log(reverseString(a[i])+"- "+i+" ый элемент в перевёрнутом виде ");
            break;
        case "function":
            console.log("результат выполнения функции под номером "+i+"-" +a[i](30)+"  ");
            break;
        default :
            console.log(i+ "ый элемент не подлежит обработке, его тип- "+typeof( a[i]));
            break;

    }

}
