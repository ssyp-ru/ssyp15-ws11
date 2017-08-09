function Road(start, end, length)
{
	this.start = start;
	this.end = end;
	this.length = length;
}
function Dead(name, start, speed)
{
	this.name = name;
	this.start = start;
	this.speed = speed;
	this.city = start;
	this.target = null;
	this.distance = 0;
	this.road = null;
	this.GoTo = function(target)
	{
		console.log(this.name, "is going to", target.name, "from", this.city.name);
		this.target = target;
		this.road = GetRoad(this.city, target);
		this.city = null;
	}
	this.Arrive = function()
	{
		console.log(this.name, "has come to", this.target.name, "from", this.road.start.name);
		this.city = this.target;
		this.target = null;
		this.road = null;
		this.distance = 0;
	}
	this.Go = function()
	{
		
		this.distance += this.speed;
		if(this.city === null)
		{
			if(this.distance >= this.road.length)
				this.Arrive();
		}
	}
}
function Walker(name, start, end, speed)
{
	this.name = name;
	this.start = start;
	this.end = end;
	this.speed = speed;
	this.city = start;
	this.target = null;
	this.distance = 0;
	this.road = null;
	this.GoTo = function()
	{
		console.log(this.name, "is going to", target.name, "from", this.city.name);
		this.target = GetCleverTown();
		this.road = GetRoad(this.city, GetCleverTown());
		this.city = null;
	}
	this.GoToRandom = function()
	{
		var tar = player.city.roads[rand(player.city.roads.length)].end;
		console.log(this.name, "is going to", tar.name, "from", this.city.name);
		this.target = tar;
		this.road = GetRoad(this.city, tar);
		this.city = null;
	}
	this.Arrive = function()
	{
		console.log(this.name, "has come to", this.target.name, "from", this.road.start.name);
		this.city = this.target;
		this.target = null;
		this.road = null;
		this.distance = 0;
	}
	this.Go = function()
	{
		this.distance += this.speed;
		if(this.city === null)
		{
			if(this.distance >= this.road.length)
				this.Arrive();
		}
	}
	
	this.danger = 0;
}
function Town(name)
{
	this.name = name;
	this.roads = [];
	this.nTowns = [];
	this.MakeRoad = function(to, length)
	{
		this.roads.push(new Road(this, to, length));
		to.roads.push(new Road(to, this, length));
	}
}
function InitNTowns()
{
	for(var i = 0; i < towns.length; i++)
	{
		for(var j = 0; j < towns[i].roads.length; j++)
		{
			towns[i].nTowns.push({town:towns[i].roads[j].end, firsttown:towns[i].roads[j].end, len:towns[i].roads[j].length});
		}
	}	
	for(var i = 1; i < towns.length; i++)
	{
		for(var j = 0; j < towns.length; j++)
		{
			for(var k = 0; k < towns[j].nTowns.length; k++)
			{
				var neighbour = towns[j].nTowns[k];
				for(var n = 0; n< neighbour.nTowns.length; n++) {
					if(towns[j] !== neighbour.nTowns[n].town)
					{
						if((neighbour.nTowns[n].town === towns[j])&&(neighbour.len + neighbour.nTowns[n].len < towns[j].nTowns.filter(function(x){return neighbour.nTowns[n].town === x;})[0].len))
						{
							towns[j].nTowns.filter(function(x){return neighbour.nTowns[n].town === x;})[0].len = neighbour.len + neighbour.nTowns[n].len;
						}
					}
				}
				
			//if(towns[j].nTowns[k].some(function(x){return x.}))
			}
		}
	}
}
var rand = function(x)
{
	return Math.floor(Math.random()*x);
}
var GetRoad = function(start, end)
{
	for(var i = 0; i < start.roads.length; i++)
	{
		if(start.roads[i].end === end)
		{
			return start.roads[i];
		}
	}
}
var towns = [];
towns.push(new Town("Saint-Petersburg"));//0
towns.push(new Town("Moscow"));//1
towns.push(new Town("Vladivostok"));//2
towns.push(new Town("Warsaw"));//3
towns.push(new Town("Baku"));//4
towns.push(new Town("Tokio"));//5
towns.push(new Town("Beijing"));//6
towns.push(new Town("Berlin"));//7
towns.push(new Town("Amsterdam"));//8
towns.push(new Town("London"));//9
towns.push(new Town("Paris"));//10
towns.push(new Town("Istanbul"));//11
towns.push(new Town("Mumbai"));//12
towns.push(new Town("Madrid"));//13
towns.push(new Town("Sidney"));//14
towns.push(new Town("Caire"));//15
towns.push(new Town("Capetown"));//16
towns[0].MakeRoad(towns[1], 4);
towns[1].MakeRoad(towns[2], 12);
towns[2].MakeRoad(towns[5], 5);
towns[5].MakeRoad(towns[6], 6);
towns[6].MakeRoad(towns[14], 7);
towns[12].MakeRoad(towns[14], 8);
towns[6].MakeRoad(towns[12], 4);
towns[11].MakeRoad(towns[12], 9);
towns[4].MakeRoad(towns[6], 7);
towns[1].MakeRoad(towns[6], 10);
towns[1].MakeRoad(towns[4], 8);
towns[1].MakeRoad(towns[3], 6);
towns[3].MakeRoad(towns[7], 3);
towns[4].MakeRoad(towns[7], 4);
towns[7].MakeRoad(towns[11], 4);
towns[3].MakeRoad(towns[8], 3);
towns[8].MakeRoad(towns[7], 2);
towns[8].MakeRoad(towns[9], 3);
towns[8].MakeRoad(towns[10], 2);
towns[9].MakeRoad(towns[10], 1);
towns[10].MakeRoad(towns[11], 5);
towns[9].MakeRoad(towns[13], 4);
towns[13].MakeRoad(towns[10], 2);
towns[13].MakeRoad(towns[15], 5);
towns[15].MakeRoad(towns[11], 6);
towns[16].MakeRoad(towns[15], 8);
var player = new Walker("Artem", towns[16], towns[2], 1);
var deads = [];
var time = 0,inf = 999999999;
var graf = new Array(20, 20);
var distances = [];
for(var i = 0; i < 15; i++)
	deads.push(new Dead("Bot-"+i.toString(), towns[rand(towns.length)], 1));
console.log(deads);
while(player.city !== player.end)
{
	for(var i = 0; i < deads.length; i++)
	{
		if((deads[i].city === player.city)&&(player.city !== null))
		{
			player.danger++;
			console.log(player.name, "can die in", player.city.name, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
		}
	}
	for(var i = 0; i < deads.length; i++)
	{
		if(((player.road !== null)&&(deads[i].road !== null))&&(((deads[i].road === player.road)&&(deads[i].distance === player.distance))||((deads[i].road === new Road(player.road.end, player.road.start, player.road.length))&&(deads[i].distance === player.road.length - player.distance))))
		{
			player.danger++;
			console.log(player.name, "can die on road", player.road.start.name, "-", player.road.end.name, "AAAAAAAAAAAAAAAAAAAAAAA");
		}
	}
	if(player.city !== null)
	{
		//player.GoToRandom();
		player.GoTo();
	}
	for(var i = 0; i < deads.length; i++)
	{
		if(deads[i].city !== null)
		{
			deads[i].GoTo(deads[i].city.roads[rand(deads[i].city.roads.length)].end);
		}
		deads[i].Go();
	}
	player.Go();
	time++;
	console.log("Now is the", time, "day");
}
console.log(player.name, "has saved his ass");