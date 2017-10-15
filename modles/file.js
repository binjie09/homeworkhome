var fs = require("fs");
//找到所有文件夹
exports.getAllFolder = function (callback) {
    fs.readdir( "./uploads/" ,function (err, files) {
        var allFolder = [];
        for(var i = 0; i < files.length;i++){
            fs.statSync("./uploads/").isDirectory();
            allFolder.push(files[i]);
        }
        callback(allFolder);
        return ;
    });

}
//a
exports.getAllFileByFolderName = function (filename,callback) {
    fs.readdir( "./uploads/"+filename +"/",function (err, files) {
        console.log(err);
        if(err){
            callback(err,[]);
            return;
        }
        var allFile = [];
        for(var i = 0; i < files.length;i++){
            var stats=fs.statSync("./uploads/"+filename+"/").isFile();
            allFile.push(files[i]);
        }

        callback(err,allFile);
        return ;
    });
}