const NEED = 1000000;
const PERCENT=1.5;
var coins = 100;
var protBuilds = [];
var builds = [];
var endTime=10000000;
var dayCount=0;
function copy(a, b) {
    for (c in a) {
        b[c] = a[c];
    }
    return b;
}
function Build(price, dayToBuild, period, income, name, countDays, timeWithoutMoney, maxCount, count) {
    this.price = price;
    this.dayToBuild = dayToBuild;
    this.period = period;
    this.income = income;
    this.name = name;
    this.countDays = countDays;
    this.timeWithoutMoney = timeWithoutMoney;
    this.maxCount = maxCount;
    this.count = count;
    this.okupanieTime=dayToBuild+price/(income/period);
}
protBuilds.push(new Build(100, 30, 7, 20, "№1", 0, 0, 2 / 0, 0));
protBuilds.push(new Build(200, 50, 30, 100, "№2", 0, 0, 2 / 0, 0));
protBuilds.push(new Build(3000, 100, 10, 70, "№3", 0, 0, 2 / 0, 0));
protBuilds.push(new Build(50000, 130, 60, 600, "№4", 0, 0, 2 / 0, 0));
protBuilds.push(new Build(250000, 200, 1, 50, "№5", 0, 0, 2 / 0, 0));
Build.prototype.do = function () {
    this.countDays++;
   // console.log("YY");
    if (this.countDays > this.dayToBuild) {
        this.timeWithoutMoney++;
        if (this.timeWithoutMoney >= this.period) {
          //  console.log("YOY");
            coins += this.income;
            this.timeWithoutMoney -= this.period;
         //   return this.income;
        }
    }

    //return 0;

}
Build.prototype.doR = function () {
    this.countDays++;
    if (this.countDays > this.dayToBuild) {
        this.timeWithoutMoney++;
        if (this.timeWithoutMoney >= this.period) {
            //coins += this.income;
            this.timeWithoutMoney -= this.period;
            return this.income;
        }
    }
    return 0;

}
function buyBuild(a) {
   // console.log(a);
    if (a.price <= coins && a.count < a.maxCount) {
        a.count++;
        coins -= a.price;
        var g = {};
        copy(a, g);
        builds.push(g);
        endTime=calculateEndTime(builds);
        console.log("New endTime-"+endTime);
    }

}

function calculateEndTime(ar) {
    var normAr = [];
    var coi=0;
    copy(coins,coi);
    var dc=dayCount;
    var maxb=-1;
    for (var i = 0; i < ar.length; i++)
    {
        var c={};
        copy(ar[i],c);
        normAr.push(c);
    }

    for(var i=1;i<arguments.length;i++) {
     var cop={};
        copy(arguments[i],cop);
        normAr.push(cop);
        coi-=cop.price;
    }
if(normAr.length===0)
return 1000000000000;
    //console.log(coins);
    while(coi<NEED)
    {
     dc++;
        for(var i=0;i<normAr.length;i++)
        {
            coi+=normAr[i].doR();
        }
       // console.log(coi);
    }

  //console.log(dc);
return dc;
}
//buyBuild(protBuilds[0]);
calculateEndTime(builds,protBuilds[0]);

//console.log(coins<NEED);
//console.log(coins);
function calculateValB(a)
{
    var v=[];

    for(var i=0;i<a.length;i++)
    {
        if(a[i].price<=coins)
        {
            var et=calculateEndTime(builds,a[i]);

            if(PERCENT<endTime-et)

            {
                v.push(protBuilds[i]);
            }
        }

    }
    for(var j=0;j< v.length;j++)
    {
        for(var i=0;i< v.length-1;i++)
        {
            if(v[i].price<v[i+1].price)
            {
                var n=v[i];
                v[i]=v[i+1];
                v[i+1]=n;
            }
        }
    }
   // console.log(v);
return v;
}
function getFormattedBuilds() {
    var s = [], indexes = [];

    for (var i = 0; i < builds.length; i++) {
        var ind = s.indexOf(builds[i].name);
        if (ind < 0) {
            s.push(builds[i].name);
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

while(coins<NEED)
{
    endTime=calculateEndTime(builds);
    dayCount++;
    //console.log(builds);
    for(var i=0;i<builds.length;i++) {
  //  console.log("NIGA");
        builds[i].do();
    }

    console.log("день №"+dayCount +"   деньги-"+coins+" приблизительное время окончания-"+endTime);
    console.log(getFormattedBuilds());
    console.log();
    et=calculateEndTime(builds);
   var bui={};
    for(var i=protBuilds.length-1;i>-1;i--)
    {
        if(protBuilds[i].count)
        {
            bui=protBuilds[i];
            break;
        }
    }

    if(!(bui.okupanieTime>endTime)) {
       var valB = calculateValB(protBuilds);

       while (valB.length > 0) {
           buyBuild(valB[0]);
           valB = calculateValB(valB);
       }
   }
}