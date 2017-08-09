var field = [[0,0,0],[0,0,0],[0,0,0]];
var hod = 0, a, b;
function iswin(){
	if(((field[0][0] === 1)&&(field[1][0] === 1)&&(field[2][0] === 1))||((field[0][0] === 1)&&(field[0][1] === 1)&&(field[0][2] === 1))||((field[1][0] === 1)&&(field[1][1] === 1)&&(field[1][2] === 1))||((field[0][1] === 1)&&(field[1][1] === 1)&&(field[2][1] === 1))||((field[2][0] === 1)&&(field[2][1] === 1)&&(field[2][2] === 1))||((field[0][2] === 1)&&(field[1][2] === 1)&&(field[2][2] === 1))||((field[0][0] === 1)&&(field[1][1] === 1)&&(field[2][2] === 1))||((field[2][0] === 1)&&(field[1][1] === 1)&&(field[0][2] === 1)))
	{
		return "POBEDILI KRESTYKI, NOLIKI RAKI";
	}
	else if(((field[0][0] === 2)&&(field[1][0] === 2)&&(field[2][0] === 2))||((field[0][0] === 2)&&(field[0][1] === 2)&&(field[0][2] === 2))||((field[1][0] === 2)&&(field[1][1] === 2)&&(field[1][2] === 2))||((field[0][1] === 2)&&(field[1][1] === 2)&&(field[2][1] === 2))||((field[2][0] === 2)&&(field[2][1] === 2)&&(field[2][2] === 2))||((field[0][2] === 2)&&(field[1][2] === 2)&&(field[2][2] === 2))||((field[0][0] === 2)&&(field[1][1] === 2)&&(field[2][2] === 2))||((field[2][0] === 2)&&(field[1][1] === 2)&&(field[0][2] === 2)))
	{
		return "POBEDILI NOLIKI, KRESTYKI RAKI";
	}
	else if(field.every(function(x){return x>0}))
	{
		return "NICH'YA, RAKI";
	}
	else
	{
		return "azaza";
	}	
}
console.clear();
while(iswin() === "azaza")
{
	if(hod % 2 === 0)
	{
		while(field[a = Math.round(Math.random()*2)][b = Math.round(Math.random()*2)] > 0)
		{}
		field[a][b] = 1;
		hod++;
		for(var i = 0; i <= 2; i++){
			console.log(field[i][0], field[i][1], field[i][2]);		
		}
		console.log("krestiki pohodili");
	}
	else
	{
		while(field[a = Math.round(Math.random()*2)][b = Math.round(Math.random()*2)] > 0)
		{}
		field[a][b] = 2;
		hod++;
		for(var i = 0; i <= 2; i++){
			console.log(field[i][0], field[i][1], field[i][2]);		
		}
		console.log("noliki pohodili");
	}
}
console.log(iswin());