const  MAXL=10;
function GLog(ar)
{
    this.messages=[];
    if(ar)
    {
        for(var i in ar)
        {
            if(typeof (ar[i])!=="function")
            this.add(ar[i]);
        }
    }
}
GLog.prototype.add=function(message) {
    if(this.messages.length>=MAXL)
    {
        this.messages.shift();
    }
    this.messages.push(message);
}
GLog.prototype.toString=function() {
    var str="";
    for(var c in this.messages)
    {
        if(typeof (this.messages[c])!=="function")
        {
            str+="<br>";
            str+=this.messages[c].toString();

        }
    }
    return str;
}


module.exports.Glog=GLog;