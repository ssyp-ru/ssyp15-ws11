function Creature(weight, height, name) {
    this.weight = weight;
    this.height = height;
    this.name = name;
}
Creature.prototype.sayName = function () {
    console.log("Hello I am creature and my name is" + this.name);
}
Cat.prototype = new Creature();
Cat.prototype.sayName = function () {
    console.log("Myau Myau Myau");
}
function Cat(weight, height, name, type) {
    Creature.call(this, weight, height, name);
    this.type = type;
}
Dog.prototype = new Creature();
Dog.prototype.sayName = function () {
    console.log("Gav Gav Gav");
}
function Dog(weight, height, name, type) {
    Creature.call(this, weight, height, name);
    this.type = type;
}
var ar = [];
for (var i = 0; i < 100; i++) {
    var r = Math.round(Math.random());
    // console.log(r);
    switch (r) {
        case 0:
            ar[i] = new Cat(10, 30, "Barsik", "Siamskii");
            break;
        case 1:
            ar[i] = new Dog(20, 50, "Bobik", "Ovcharka");
            break;
    }

}
//console.log(ar);
ar.forEach(function (a) {
    a.sayName()
});
