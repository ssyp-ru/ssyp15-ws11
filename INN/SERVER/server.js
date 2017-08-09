var http=require("http");
var url=require("url");
var qs=require("querystring");

function start(route,handle){
  function onRequest(req,res)
  {
    //var ip=req._remoteAddress;
     // console.log(ip);
      var pathname=url.parse(req.url).pathname;

      var params=qs.parse( url.parse(req.url).query);

      console.log("Request for "+pathname+" received");
      route(handle,pathname,res,params);
      //res.write(content);
      //res.end();
  }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started");

};
//start();


module.exports.start=start;
//module.exports.route=route;