var fs = require("fs");
var db = require("./db.js");
var path = require("path");
var formidable = require("formidable");
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

exports.saveFileToDir = function (req,zuoyekemu,callback) {
    var form = new formidable.IncomingForm();//获得即将到来的post的表单信息

    form.uploadDir = path.normalize(__dirname + "/../" );// 临时储存
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        var xuehao =req.session.xuehao;
        if(err){
            return;
        }
        var keti;
        var fenzu;

        db.find("students",{"sno" : xuehao}, function (err, result) {
            keti = result[0].ruanjianketi;
            fenzu = result[0].ruanjianfenzu;
            var oldpath = files.zuoye.path;
            var extname = path.extname(files.zuoye.name);
            var newpath =   form.uploadDir + "/uploads/"+keti+"/" + "软件工程 5,7班 第 "+fenzu  +"组 可行性研究报告V1.0" +extname;
            if(!fs.existsSync(form.uploadDir + "/uploads/"+keti )){
                fs.mkdirSync(form.uploadDir + "/uploads/" +keti);
            }
            fs.renameSync(oldpath,newpath,function (err) {
                if(err){
                    callback("文件重命名错误。");
                }
            });
            db.insertOne("homeworkFiles",{
                "homeworkID" : 1,
                "filePath" : newpath,
                "owner" : req.session.xuehao,
                "firstTime" : 0,
                "lastTime" : 0
            },function (mongoError, p2) {
                callback(null,result);
            });

        });
    });
}