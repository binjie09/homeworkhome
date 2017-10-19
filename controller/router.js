var file = require("../modles/file.js");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
exports.showIndex = function (req,res) {
    // res.render("index",{
    //     "albums" :  file.getAllFolder()
    // });
    //

    file.getAllFolder(function (allFolder) {
        var username = "你没有登陆";
        if(req.session.login){
            username = req.session.username;
        }
        res.render("index",{
            "albums" : allFolder,
            "username" : username,
            "islogin" : req.session.login
        });
    });
}
exports.login = function (req, res) {
    res.render("login");
}
exports.showAlbum = function (req, res,next) {
    var fileName = req.params.albumName;

    file.getAllFileByFolderName(fileName,function (err, filesArray) {
    //console.log(req);
        if(err){
            next();
            return;
        }
        res.render("showfile", {
            "files" :filesArray,
            "filename" : fileName
        });
    });
}

exports.shangchuan = function (req,res) { //显示上传页面

        res.render("shangchuan");
}

exports.register = function (req, res) {
    res.render("register");
}

exports.doshangchuan = function (req, res) {
    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + "/../" );
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        if(err){

            return;
        }
        var xuehao =fields.number;
        var extname = path.extname(files.zuoye.name);
        var name = fields.name;
        var oldpath = files.zuoye.path;
        var newpath =   form.uploadDir + "/uploads/"+xuehao+"/" + xuehao + "_" + name +extname;
        if(!fs.existsSync(form.uploadDir + "/uploads/"+xuehao )){
            fs.mkdirSync(form.uploadDir + "/uploads/" +xuehao);
        }
        fs.renameSync(oldpath,newpath,function (err) {
            if(err){
                //res.send("失败12344");
                res.send(err);
            }
        });
        file.getAllFolder(function (allFolder) {
            res.render("index",{
                "albums" : allFolder
            });
        });
    });

}


exports.doregist = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req,function (err, fields) {
        console.log(fields);
        db.insertOne("users",{
            "dengluming" : fields.xuehao,
            "mima" : fields.mima
        },function (mongoError,res) {
            if(mongoError){
                res.send("-1");
                return;
            }
            res.send("1");
        });
    });
}