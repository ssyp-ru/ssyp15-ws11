var Building=function(nm,pr,dtb,per,mi)
{
	this.Name=nm;
	this.Price=pr;
	this.DaysToBuild=dtb;
	this.DaysToBuildLeft=dtb;
	this.DaysToMI=per;
	this.DaysToMILeft=per;
	this.MoneyIncome=mi;
	this.StartBuild=function()
	{
		console.log(this.Name,":building is started!  -",this.Price);
		budget-=this.Price;
		onedaymoney-=this.Price;
	}
	this.OneDay=function()
	{
		if (this.DaysToBuildLeft===0)
		{
			if (this.DaysToMILeft===0)
			{
				budget+=this.MoneyIncome;
				onedaymoney+=this.MoneyIncome;
				this.DaysToMILeft=this.DaysToMI;
				console.log(this.Name,":money income!  +",this.MoneyIncome,"cr!!");
			}
			else
				this.DaysToMILeft--;
		}
		else
		{
			this.DaysToBuildLeft--;
			if (this.DaysToBuildLeft===0)
				console.log(this.Name,":built!!!");
		}
	}
}
var budget=100,day=1,buildingcount=0,shopcount=0,carrotfieldcount=0,onedaymoney=0;
var city=[]
var carrotfield=new Building("dd",50,7,5,25);
var shop=new Building("dd",200,7,7,100);
while (budget<100000)
{
	console.log("Day",day,"Budget:",budget);
	do
	{
		if (budget-shop.Price>=0)
		{
			buildingcount++;
			shopcount++;
			city[buildingcount-1]=new Building("Shop"+shopcount,shop.Price,shop.DaysToBuild,shop.DaysToMI,shop.MoneyIncome);
			city[buildingcount-1].StartBuild();
		}
		if (budget-carrotfield.Price>=0)//&&(carrotfieldcount<100))
		{
			buildingcount++;
			carrotfieldcount++;
			city[buildingcount-1]=new Building("Carrotfield"+carrotfieldcount,carrotfield.Price,carrotfield.DaysToBuild,carrotfield.DaysToMI,carrotfield.MoneyIncome);
			city[buildingcount-1].StartBuild();
		}	
	}
	while ((budget>carrotfield.Price)&&(onedaymoney>-1000));
	for (var i=0;i<buildingcount;i++)
		city[i].OneDay();
	day++;
	console.log("Day profit:",onedaymoney,"cr");
	onedaymoney=0;
}
console.log("Day",day,"Budget:",budget);
