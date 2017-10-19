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
app.get("/logout", function(req,res) {
    delete req.session.user;
    return res.render('login');
});
app.get("/register",router.register);
app.post("/doregist",router.doregist)
app.get("/shangchuan",router.shangchuan);
app.get("/:albumName",router.showAlbum);
app.post("/doshangchuan",router.doshangchuan);
app.post("/checklogin",router.checklogin);
app.use(function (req,res) {
    res.render("err");
});


app.listen(3000);

