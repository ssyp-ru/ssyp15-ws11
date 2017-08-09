fs=require("fs");
var Text= function (name,text)
{
    this.Name=name+".txt";
    this.Text=text;
    this.Words=0;
    this.Sentences=0;
    this.Symbols=0;
    this.Strings=1;
}
var t=[];
t.push(new Text("q",fs.readFileSync("./txt/q.txt",'utf8')));
t.push(new Text("w",fs.readFileSync("./txt/w.txt",'utf8')));
t.push(new Text("e",fs.readFileSync("./txt/e.txt",'utf8')));
t.push(new Text("r",fs.readFileSync("./txt/r.txt",'utf8')));

for (var ti=0;ti< t.length;ti++)
{
    for (var i=0;i<t[ti].Text.length;i++)
    {
        switch (t[ti].Text[i])
        {
            case " ":
            {
                t[ti].Words++;
                break;
            }
            case ".":
            {
                t[ti].Symbols++;
                t[ti].Sentences++;
                break;
            }
            case "\n":
            {
                t[ti].Strings++;
                break;
            }
            default :
            {
                t[ti].Symbols++;
                break;
            }
        }
    }
    console.log(t[ti].Name,"WoSeSySi:",t[ti].Words,t[ti].Sentences,t[ti].Symbols,t[ti].Strings);
}
