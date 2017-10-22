exports.getJson = function (req,callback) {//顶部栏需要的json 所有的都需要
        var json = {
            "username" : req.session.username || "请登录",
            "islogin" : req.session.login,
            "xuehao" : req.session.xuehao,
            "isadmin" :req.session.isadmin
        }
        callback(json);
}