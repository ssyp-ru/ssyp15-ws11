var fs=require("fs");

var stream=new fs.ReadStream(__filename,{encoding:'utf-8'});

stream.on("open",function(){console.log("открыли")});
stream.on('readable',function(){var data=stream.read();console.log(data)});

stream.on('end',function(){console.log("end") });