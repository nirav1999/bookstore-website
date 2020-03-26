var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var index = require('./routes/index');
var users = require('./routes/users');
var sql = require("mysql");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', index);
app.use('/users', users);
var  flash= require('connect-flash');
var session = require('express-session');

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  app.use(flash());

app.use("/",function(req,res,next){
	console.log(req.url);
	next();
});

var con = sql.createConnection({
  "host" : "localhost",
  "user": "root",
  "server":"localhost:3306",
  "database": "bestproject"
});


app.get('/', function (req, res) {
     
      req.flash("welcome", "welcome");

      
    // connect to your database
    con.connect( function (err) {
        if (err) console.log(err);

        });
    res.clearCookie('value'); 
    res.render('main1', {message: 'welcome',disable : 'disabled'});

    });



var server = app.listen(8010, function () {
    console.log('Server is running..');
});