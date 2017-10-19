var file = require("../modles/file.js");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var db = require("../modles/db.js");
exports.showIndex = function (req,res) {

    file.getAllFolder(function (allFolder) {
        var username = "你没有登陆";
        if(req.session.login){
            username = req.session.username;
            res.render("index",{
                "albums" : allFolder,
                "username" :"欢迎你 " + username,
                "islogin" : req.session.login
            });
            return;
        }
        res.render("index",{
            "albums" : allFolder,
            "username" : username,
            "islogin" : req.session.login
        });
    });
}
exports.login = function (req, res, next) {
    var username = "你没有登陆";
    username = req.session.username;
    res.render("login",{
        "username" : username,
        "islogin" : req.session.login
    });
}
exports.showAlbum = function (req, res,next) {
    if(!req.session.login){
        next();
        return;
    }
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
exports.shangchuan = function (req,res,next) { //显示上传页面
    if(!req.session.login){
        next();
        return;
    }
    res.render("shangchuan",{
        "username":req.session.username,
        "islogin" : req.session.login
    });
}
exports.register = function (req, res) {
    res.render("register");
}
exports.doshangchuan = function (req, res, next) {
    if(!req.session.login){
        next();
        return;
    }
    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + "/../" );
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
                    res.send(err);
                }
            });
        });
        // var xuehao =req.session.xuehao;
        // var extname = path.extname(files.zuoye.name);
        // var name =req.session.username;
        // var oldpath = files.zuoye.path;
        // var newpath =   form.uploadDir + "/uploads/"+xuehao+"/" + xuehao + "_" + name +extname;
        // if(!fs.existsSync(form.uploadDir + "/uploads/"+xuehao )){
        //     fs.mkdirSync(form.uploadDir + "/uploads/" +xuehao);
        // }
        // fs.renameSync(oldpath,newpath,function (err) {
        //     if(err){
        //         //res.send("失败12344");
        //         res.send(err);
        //     }
        // });
        res.set('refresh', '3;url=http://218.195.250.2/');
        res.send("提交作业成功，3秒后返回首页");

        return;
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
exports.checklogin = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req,function (err, fields) {
        var username = fields.xuehao;
        var password = fields.mima;
        console.log(username + password);
        db.find("students",{"sno" : username}, function (err, result) {
            if(err){
                res.send("-1");
                return;
            }
            if(result.length == 0){
                res.send("-1");
                return;
            }
            if(password == result[0].mima){
                req.session.login = "1";
                req.session.xuehao = username;
                req.session.username = result[0].name;
                res.send("1");
                return;
            }else{
                res.send("-1");
                return;
            }
        });
    });
}
exports.xiugaimima = function (req, res, next) {
    if(!req.session.login){
        next();
        return;
    }
}
exports.admin = function (req, res, next) {
    if(!req.session.isadmin){
        next();
        return;
    }
}