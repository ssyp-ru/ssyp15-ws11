var Time=function(tid,tih,tim)
{
	this.Day=tid;
	this.Hour=tih;
	this.Minute=tim;
	this.SayTime=function()
	{
		var timestr="Day ";
		timestr+=this.Day;
		timestr+=" ";
		if (this.Hour<10)
			timestr+="0";
		timestr+=this.Hour;
		timestr+=":";
		if (this.Minute<10)
			timestr+="0";
		timestr+=this.Minute;
		console.log(timestr);
	}
	this.MinuteEncrease=function()
	{
		this.Minute++;
		if (this.Minute>=60)
		{
			this.Minute-=60;
			this.Hour++;
		}
		if (this.Hour>23)
		{
			this.Hour-=24;
			this.Day++;
		}
	}
}
module.exports=Time;