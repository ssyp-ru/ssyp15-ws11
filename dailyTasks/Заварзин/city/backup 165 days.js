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
			if (this.DaysToMILeft===1)
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
function SelectBuilding()
{
	select=-1;
	var maxq=0;
	for (var j=0;j<catalog.length;j++)
		if (budget-catalog[j].Price>=0)
			if (targetmoney*catalog[j].DaysToMI/catalog[j].MoneyIncome>maxq)
			{
				select=j;
				maxq=targetmoney*catalog[j].DaysToMI/catalog[j].MoneyIncome>maxq;
			}
}
var budget=100,day=1,buildingcount=0,onedaymoney=0,targetmoney=100000,select=2,safecap=200;
var city=[],catalog=[];
catalog[0]=new Building("Carrotfield",50,7,5,25);
catalog[1]=new Building("Shop",200,7,7,100);
var count=[0,0,0];
while (budget<targetmoney)
{
	console.log("Day",day,"Budget:",budget);
	do
	{	
		SelectBuilding();
		if (select>=0)
		{
			buildingcount++;
			count[select]++;
			city[buildingcount-1]=new Building(catalog[select].Name+count[select],catalog[select].Price,catalog[select].DaysToBuild,catalog[select].DaysToMI,catalog[select].MoneyIncome);
			city[buildingcount-1].StartBuild();		
		}
	}
	while ((budget!=0)&&(onedaymoney>-safecap)&&(select>=0));
	//while ((budget>0));
	for (var i=0;i<buildingcount;i++)
		city[i].OneDay();
	day++;
	console.log("Day profit:",onedaymoney,"cr");
	onedaymoney=0;
}
console.log("Day",day,"Budget:",budget);
