/**
 * Created by user on 30.07.2015.
 */
fs=require("fs");
var input=fs.readFileSync("./txt/input.txt",'utf8');
var finalstring="";
var c=1;
for (var i=0;i<input.length;i++)
{
    if (input[i]==" ")
        c++;
    if (c%5==0)
    {
        do
        {
            i++;
            finalstring=finalstring+input[i];
        }
        while(input[i]!==" ");
        console.log(finalstring);
        c=1;
    }
}
fs.writeFileSync("./txt/output.txt",finalstring);