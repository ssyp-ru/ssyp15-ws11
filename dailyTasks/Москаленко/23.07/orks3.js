var mobs = [];
		var i, r, winner, count = 20, x = count;
		var mob = function(name) {
			this.name = name;
			this.HP = 100;
			this.attack = 100;
		};

		for(i=0; i<count; i++) {
			mobs[i] = new mob("Орк "+(i+1));
		};

		function random() {
			return Math.floor(Math.random()*mobs.length);
		};

		for(i=0; i<mobs.length; i++) {
			var r = random();
			var r2 = random();
			
			if (x === 1) {
				break;
			}
			
			while (mobs[r].HP <= 0) r = random();
			while ((r === r2) || (mobs[r2].HP <= 0)) r2 = random();
			
			for (i = 1; i < count+1; i++) {
				document.getElementById("p" + i).innerHTML=mobs[r2].name + ' убил ' + mobs[r].name;
			};
			
			//console.log(mobs[r2].name, "damages for", mobs[r2].attack,"->",mobs[r].name);
			mobs[r].HP = mobs[r].HP - mobs[r2].attack;
			
			if (mobs[r].HP <= 0) {
				console.log(mobs[r].name,"die");
				x--;
				}
			winner = r2;
		};

		document.getElementById("winner").innerHTML+="<br>" + "Орк " + (winner+1) + " победил!";
		//console.log("ORK",winner+1, "win");

		//for (i = 0; i < 10; i++) console.log(mobs[i]);