function Top(players, param){
	var arr = players.sort(function(player1, player2){
		console.log(player1, player2, param);
		return player1[param] - player2[param];
	})
	var str = "";
	for(var i = 1; i <= arr.length; i++)
	{
		str += "Место - "+i+" Имя - "+arr[i-1].name+"("+arr[i-1].id+") "+param+" - "+arr[i-1][param]+"\br";
	}
	return str;
}