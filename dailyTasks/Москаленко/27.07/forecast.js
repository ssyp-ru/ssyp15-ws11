//ver 1.0 Author: Moskalenko K.

var forecast = function(m) {
	this.m = m;

	var month = [], flag;

	month[0] = 90;
	month[1] = 95;
	month[2] = 80;
	month[3] = 60;
	month[4] = 30;
	month[5] = 10;
	month[6] = 5;
	month[7] = 20;
	month[8] = 30;
	month[9] = 50;
	month[10] = 60;
	month[11] = 80;

	var random = Math.floor(Math.random() * 100);

	if (random > month[m])
		flag = true;
	else
		flag = false;

//true - не будет осадков, false - будут осадки
return (flag);
};