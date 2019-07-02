var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var index = require('./routes/index');
var users = require('./routes/users');
var sql = require("mssql");
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


app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = require('./config/db')
      req.flash("welcome", "welocme");

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request objec
                    sql.close();
        });

    res.render('loginsignup', {message: req.flash('welcome') });

    });



var server = app.listen(5000, function () {
    console.log('Server is running..');
});