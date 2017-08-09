var fs   = require("fs");

function fileSort(x, y) {
    var pos_1 = x.indexOf(".");
    var pos_2 = y.indexOf(".");

    if(pos_1 !== -1 && pos_2 === -1) {
        return 1;
    } else {
        return 0;
    }
}

function readFolders(path) {
    try {
        fs.readdir(path, function(err, files) {
            if(!files) {
                return 0;
            }

            files.sort(fileSort);

            for (var i = 0; i < files.length; i++) {
                console.log(files[i]);
                readFolders(path + files[i] + "/");
            }

            console.log("*****");
        });
    }

    catch(err) {
        //не туда входите
    }
}

readFolders("./source/");