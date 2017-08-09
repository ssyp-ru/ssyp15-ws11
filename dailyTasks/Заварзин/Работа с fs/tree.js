/**
 * Created by user on 30.07.2015.
 */
fs=require("fs");
var st=function(err,stats)
{
    console.log(stats);
    if (stats.isFile()==true)
    {
        console.log("WOW");
        fs.readdir(name + "/" + files[i], f);
    }
};
var f=function(err,files)
{
    console.log(files);
    for (var i=0;i<files.length;i++)
        if (fs.stat(files[i], st));
};
fs.readdir("./txt",f);
