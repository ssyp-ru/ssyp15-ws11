fs = require("fs");

var i, arr = [], arr2 = [];
var t = fs.readFileSync("./TXTS/text.txt", 'utf8');

arr = t.split(" ");

for(i = 4; i < arr.length; i = i + 5)
    arr2.push(arr[i]);

fs.writeFileSync("./TXTS/text2.txt", arr2);