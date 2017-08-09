var fs=require("fs");
var path=require("path");
var ROOT=__dirname+ '\\'  +  "public";
console.log(ROOT);
function sendFileSave(filePath,res) {
    try{
        filePath=decodeURIComponent(filePath);
    }
    catch(e)
    {
        res.statusCode=400;
        res.end("Bad Request");
        return
    }

    if(~filePath.indexOf('\0'))
    {
        res.statusCode=400;
        res.end("Bad Request");
        return
    }

    filePath=path.normalize(path.join(ROOT,filePath));
   // console.log(filePath);
    //console.log(ROOT);
    if(filePath.indexOf(ROOT)!=0)
    {
        //console.log(228+filePath);
        res.statusCode=400;
        res.end("File not found");
        return;
    }

    fs.stat(filePath,function(err,stats)
    {
        if(err||!stats.isFile())
        {
          //  console.log(1);
            res.statusCode=400;
            res.end("File not found");
            return;
        }
        sendFile(filePath,res);

    })

}
function sendFile(filePath,res)
{

    fs.readFile(filePath,function(err,content)
    {
        if(err) throw err;

        res.end(content);
    })
}

module.exports.sendFileSave=sendFileSave;
//console.log(read(__filename));