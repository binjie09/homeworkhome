var express= require("express");
var session = require("express-session");

var app = express();

var router = require("./controller/router.js");
app.set("view engine", "ejs");
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get("/login",router.login);
app.get("/",router.showIndex);
app.get("/homework",router.showHomework);
app.get("/logout", function(req,res) {
    delete req.session.user;
    return res.render('login');
});
app.get("/register",router.register);
app.get("/shangchuan",router.shangchuan);
app.get("/admin",router.admin);
app.post("/doshangchuan",router.doshangchuan);
app.post("/doregist",router.doregist);
app.post("/checklogin",router.checklogin);
app.post("/setHomework",router.setHomework);
app.get("/:albumName",router.showAlbum);
app.use(function (req,res) {
    username = "你没有登录";
    if(req.session.login){
        username = req.session.username;
    }
    res.render("err",{
        "username" : username,
        "islogin" : req.session.login
    });
});


app.listen(3000);

