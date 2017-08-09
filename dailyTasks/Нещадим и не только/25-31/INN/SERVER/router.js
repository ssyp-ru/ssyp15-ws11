var route=function(handle,pathname,res,params)
{
    //console.log("About to route a request for "+pathname);
    if(typeof (handle[pathname])==="function")
    {
        handle[pathname](res,params);
    }
    else {
        console.log("No request handler founf for " + pathname);
        res.write( "404! Not Found");
        res.end();
    }

}
module.exports.route = route;