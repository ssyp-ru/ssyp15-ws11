
    var coins = 100;
    const NEED = 1000000;
    var buildings = [];
    var prototypsOfBuildings = [];
    var dayCount = 0;
    var endTime = 2 / 0;

    function calculateEndTime() {
        //console.log("calles");
        var build = [];
        var maxbd = 0;
        for (var i = 0; i < buildings.length; i++) {
            b = buildings[i];
            build.push(new Build(b.price, b.dayToBuild, b.period, b.income, b.name, b.floors, b.working, b.countDays, b.timeWithoutMoney));
            if (b.dayToBuild - b.countDays > maxbd)
                maxbd = b.dayToBuild - b.countDays;
        }
        // console.log(maxbd);
        var coi = coins;
        var dc = 0;
        if (build.length > 0) {
            for (var i = 0; i < maxbd; i++) {

                for (var j = 0; j < build.length; j++) {
                    coi += build[j].doReturn();
                }
            }
            dc += maxbd;
            // console.log(coi);
//console.log(dc);
            var sum = 0;
            // console.log(maxbd);
            for (var j = 0; j < build.length; j++) {
                sum += build[j].income / build[j].period;
            }
            //     console.log(sum);
            //   console.log(dc);
            // console.log(coi);
            dc += (NEED - coi) / sum;
            //   console.log(coi);
            //   console.log(dc);
            //console.log(dc);
            return dc;

        }
        else
            return 2 / 0;
    }

    function Build(price, dayToBuild, period, income, name, floors, working, countDays, timeWithoutMoney, maxCount, count) {
        this.price = price;
        this.dayToBuild = dayToBuild;
        this.period = period;
        this.income = income;
        this.name = name;
        this.floors = floors;
        this.countDays = countDays;
        this.timeWithoutMoney = timeWithoutMoney;
        this.status = "строится";
        this.working = working;
        this.maxCount = maxCount;
        this.count = count;
    }

    prototypsOfBuildings.push(new Build(100, 30, 7, 20, "№1", 1, true, 0, 0, 2 / 0, 0));
    prototypsOfBuildings.push(new Build(200, 50, 30, 100, "№2", 1, true, 0, 0, 2 / 0, 0));
    prototypsOfBuildings.push(new Build(3000, 100, 10, 70, "№3", 1, true, 0, 0, 2 / 0, 0));
    prototypsOfBuildings.push(new Build(50000, 130, 60, 600, "№4", 1, true, 0, 0, 2 / 0, 0));
    prototypsOfBuildings.push(new Build(250000, 200, 1, 50, "№5", 1, true, 0, 0, 2 / 0, 0));

    Build.prototype.do = function () {

        with (this) {

            countDays++;
            if (countDays > dayToBuild) {
                timeWithoutMoney++;
                if (timeWithoutMoney >= period) {
                    timeWithoutMoney -= period;
                    coins += income;
                    //console.log(name+": принес "+income);
                }
                status = "работает";
            }
            else {
                status = "строится";
            }

        }

    }
    Build.prototype.doReturn = function () {

        with (this) {

            countDays++;
            if (countDays > dayToBuild) {
                timeWithoutMoney++;
                if (timeWithoutMoney >= period) {
                    timeWithoutMoney -= period;
                    return income;
                }
                else
                    return 0;

            }
            else {

                return 0;
            }

        }

    }
    Build.prototype.create = function () {
        if (coins >= this.price) {

            buildings.push(new Build(this.price, this.dayToBuild, this.period, this.income, this.name, this.floors, true, this.countDays, this.timeWithoutMoney, this.maxCount, this.count));
            //console.log(name);

            coins -= this.price;
            // this.working=true;
        }
    }
    function createBuild(a) {
        if (a.price <= coins && a.count < a.maxCount) {
            var b = new Build(a.price, a.dayToBuild, a.period, a.income, a.name, a.floors, true, a.countDays, a.timeWithoutMoney, a.maxCount, a.count);
            buildings.push(b);

            coins -= a.price;
            a.count++;
        }
    }

    function getFormattedBuilds() {
        var s = [], indexes = [];

        for (var i = 0; i < buildings.length; i++) {
            var ind = s.indexOf(buildings[i].name);
            if (ind < 0) {
                s.push(buildings[i].name);
                indexes.push(1);
            }
            else {
                indexes[ind]++;
            }
        }

        for (var i = 0; i < s.length; i++) {
            s[i] = s[i] + " " + indexes[i];
        }
        //   console.log(s);
        return s;
    }

    function Pharmacy(working, countDays, timeWithoutMoney, maxCount, count) {
        Build.call(this, 100, 30, 7, 20, "Аптека", 1, working, countDays, timeWithoutMoney, maxCount, count);
    }

    Pharmacy.prototype = new Build();
    function Supermarket(working, countDays, timeWithoutMoney) {
        Build.call(this, 1000, 60, 1, 10000, "Супермаркет", 3, working, countDays, timeWithoutMoney);
    }

    Supermarket.prototype = new Build();
//prototypsOfBuildings.push(new Pharmacy(false,0,0,2/0,0));
//prototypsOfBuildings.push(new Supermarket(false,0,0));
//console.log(prototypsOfBuildings[0]);
//console.log(prototypsOfBuildings);
//console.log(buildings);

    endTime = calculateEndTime();
//console.log(calculateEndTime());
//console.log(pharmacy);
//console.log(supermarket);

    while (coins < NEED) {

//console.log(g);
        dayCount++;
        // console.log();
        endTime = calculateEndTime();

        // e.innerHTML="ssssssssssssssssd";
          console.log("День №" + dayCount + " деньги:" + coins+" приблизитльная время окнчания:"+endTime);
        //console.log("Наши здания к началу дня:");
        //console.log(getFormattedBuilds());

        var valueBuild = [];
        var maxV, et1 = endTime;

        for (var i = 0; i < prototypsOfBuildings.length; i++) {
            if (coins >= prototypsOfBuildings[i].price) {
                coins -= prototypsOfBuildings[i].price;
                buildings.push(prototypsOfBuildings[i]);
                var et = calculateEndTime();
                //console.log(et);
                if (et < endTime)
                    valueBuild.push(prototypsOfBuildings[i]);

                if (et1 > et) {
                    et1 = et;
                    maxV = prototypsOfBuildings[i];
                }
                coins += prototypsOfBuildings[i].price;
                buildings.pop();
            }
        }
        // console.log(maxV);
        if (maxV) {
            // console.log(maxV);
            createBuild(maxV);
        }


        // maxV.cost=1000000000000000000;
        while (valueBuild.length > 0) {
            var vb = [];
            for (var i = 0; i < valueBuild.length; i++) {
                b = buildings[i];
                vb.push(new Build(b.price, b.dayToBuild, b.period, b.income, b.name, b.floors, b.working, b.countDays, b.timeWithoutMoney));

            }

            valueBuild = [];
            //console.log(vb);
            for (var i = 0; i < vb.length; i++) {
                if (vb[i] <= coins) {
                    var et1 = endTime;
                    coins -= vb[i].price;
                    buildings.push(vb[i]);

                    var et = calculateEndTime();
                    if (et < endTime)
                        valueBuild.push(vb[i]);
                    if (et1 > et) {
                        et1 = et;
                        maxV = vb[i];
                    }
                    coins += vb[i].price;
                    buildings.pop();
                }
            }


            createBuild(maxV);

        }
        for (var i = 0; i < buildings.length; i++) {
            //console.log("aa");
            buildings[i].do();
        }
        //console.log("денги: "+coins);
        // console.log("Наши здания к концу дня:");
        // console.log(getFormattedBuilds());
    }
   // console.log(dayCount);
//}

