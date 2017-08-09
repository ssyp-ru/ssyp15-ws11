fs = require("fs");

fs.readdir('./FORTREE/', f);

function f(err, files) {
    var i, j;
    if(err)throw err;
    {
        for (i = 0; i < files.length; i++) {
            for (j = 0; j < files[i].length; j ++) {
                if (files[i][j] === ".")
                    console.log(files[i]);
            };
        };
    };
};