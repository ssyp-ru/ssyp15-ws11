var http=require('http');
var path=require('path');
var fs=require('fs');
var base='C:\\jpegs';
//console.log(fs);
//console.log(path);
function start() {

    http.createServer(function (req, res) {
            var pathname = base + req.url;
            console.log(pathname);
            // res.end();
            if (req.url !== "favicon.ico")
                var file = fs.createReadStream(pathname);
            file.on("open", function () {
                file.pipe(res);
            });
            file.on("error", function (err) {
                res.write("Error can't find file");
                res.end();
                console.log(err);

            });
        }
    ).listen(9999);
    console.log("static server has started");
}
module.exports.start=start;