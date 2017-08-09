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
		if ((budget-catalog[j].Price>=0)&&(catalog[j].MoneyIncome/catalog[j].DaysToMI/catalog[j].Price>maxq)&&(count[j]*catalog[j].Price*2<targetmoney-budget))
		//if ((budget-catalog[j].Price>=0)&&(count[j]*catalog[j].Price*3<targetmoney-budget))
		{
			select=j;
			maxq=catalog[j].MoneyIncome/catalog[j].DaysToMI/catalog[j].Price;
		}
}
var budget=100,day=1,buildingcount=0,onedaymoney=0,targetmoney=1000000,select=2;
var city=[],catalog=[];
catalog[0]=new Building("KFC",100,30,7,20);
catalog[1]=new Building("Vegetables",200,50,30,100);
catalog[2]=new Building("Heal",3000,100,10,70);
catalog[3]=new Building("Paintball",50000,130,60,600);
catalog[4]=new Building("Golf",250000,200,1,50);
//catalog[5]=new Building("Trashbin",200,30,60,10);
var count=[0,0,0,0,0,0];
while (budget<targetmoney)
{
	console.log("Day",day,"Budget:",budget);
	buildingcap=2;
	do
	{	
		SelectBuilding();
		if (select>=0)
		{
			buildingcap--;
			buildingcount++;
			count[select]++;
			city[buildingcount-1]=new Building(catalog[select].Name+count[select],catalog[select].Price,catalog[select].DaysToBuild,catalog[select].DaysToMI,catalog[select].MoneyIncome);
			city[buildingcount-1].StartBuild();		
		}
	}
	while ((budget!=0)&&(select>=0));//&&(buildingcap!=0));//(onedaymoney>-safecap)
	//while ((budget>0));
	for (var i=0;i<buildingcount;i++)
		city[i].OneDay();
	day++;
	console.log("Day profit:",onedaymoney,"cr");
	onedaymoney=0;
}
console.log("Day",day,"Budget:",budget);
