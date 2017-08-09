
function Top(players, param){
	
	console.log(players.length);
	var arr = players.sort(function(player1, player2){
	//	console.log(player1, player2, param);
		if(param==="gend")
		{
			if(player1[param]==="m" && player2[param]==="m")
			return 0;
			if(player1[param]==="m" && player2[param]==="f")
				return -1;
			if(player1[param]==="f" && player2[param]==="m")
				return 1;

		}
		else
		return player2[param] - player1[param];
	});
	//console.log(arr)
	var str = "";
	var count=1;
	for(var i in arr)
	{
		//console.log(arr[i].name);
		if(arr[i].name) {
			str += "№" + count + " " +arr[i].name+ "(" + arr[i].id + ") " + param + " - " + arr[i][param] + "<br>";
			count++;
		}
	}
	//console.log(str);
	return str;
}

//var pidory=[{xp:228},{xp:1488},{xp:188},{xp:227}];
//Top(pidory,"xp");
exports.Top=Top;
