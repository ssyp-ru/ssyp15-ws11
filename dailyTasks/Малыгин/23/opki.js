var m = [];
function mob() {
	
	return {name: "OPK",
		   HP: 100,
		   dead: false,
		   damage: Math.floor(Math.random()*100)};
}

function massIn() {
	for(var i = 0;i<100;i++) {
		m[i] = mob();	
	}
}

function fight() {
	for(var i = 0;i<100;i++){
		var opk1 = Math.floor(Math.random()*100);
		var opk2 = Math.floor(Math.random()*100);
		if ((m[opk1].dead !== true) && (m[opk2].dead !== true) && (opk1 !== opk2)){
				m[opk2].HP = m[opk2].HP - m[opk1].damage;
				console.log(opk1 + " damage " + opk2 + " with " + m[opk1].damage);
				if(m[opk2].HP <=0){
					console.log(opk1 + " killed " + opk2);
					m[opk2].dead = true;
				}
		}
	}
}

massIn();

fight();