fs = require("fs");

function count(name) {
    var name = name;
    var t = fs.readFileSync("./TXTS/" + name, 'utf8');
    var i, words = 1, sentences = 0, letters = 0, strings = 1;

    for(i = 0; i < t.length; i++) {
        if(t[i] === " ") words++;
        if(t[i] === ".")sentences++;
        if(t[i] != "\n")letters++;
        if(t[i] === "\n")strings++;
    };

    return("Слов: " + words + ", предложений: " + sentences + ", букв: " + letters + ", строк: " + strings);
};

fs.readdir('./TXTS/', f);

function f(err, files) {
    var i;
    if(err)throw err;
       for(i = 0; i < files.length; i++)
            console.log(files[i] + ": " + count(files[i]));
};