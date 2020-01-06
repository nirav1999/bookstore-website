var express = require('express');
var router = express();
const bodyParser = require("body-parser");
router.set('view engine', 'ejs');

var db = require('../config/db');
console.log(db);
var sql = require('mssql');
var  flash= require('connect-flash');
var session = require('express-session');
var flag=0;
var cookieParser = require('cookie-parser');

router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
router.use(flash());
router.use(cookieParser());

var result;

/* POST Add page. */
router.post('/add', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
    const email = req.body.email;
    const username = req.body.username;
    const pwd =req.body.pwd;

      req.flash("success", "successfuly Signed up");
      req.flash("incorrect", "incorrect");

      request.query("select * from userb where email='"+email+"'", function (error,rows) {
      if (error) throw error;

       console.log(rows.recordset.length); 
      if(!rows.recordset.length)
      {
            request.query("Insert into userb([name],[password],[email],[address],[mobno])  VALUES ('"+req.body.username+"','"+req.body.pwd+"','"+req.body.email+"','"+req.body.add+"','"+req.body.mobno+"')" , function (error, results, fields) {
            if (error) throw error;

        var flag=1;
           
    });
            request.query("select userid from userb where email='"+email+"'", function (error,rows1) {
      if (error) throw error;
                  
              console.log(rows1.recordset[0].userid);
              res.cookie("value",rows1.recordset[0].userid);

              console.log(req.cookies);
             request.query("CREATE TABLE [DBO].["+rows1.recordset[0].userid+"]([name] [nvarchar](10) NULL,[book] [nvarchar](10) NULL,[price] int NULL,[quantity] int NULL,[total] int NULL)", function (error,rows) {
              if (error) throw error;
                  sql.close();
            return res.render('main', {message: req.flash('success') ,disable:" "});            
    })});
      }
          else
    {
        sql.close();      
         return res.render('loginsignup', {message: req.flash('incorrect') });
    }

    })});
            // send records as a response
        });

router.post('/add1', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
    const username = req.body.username;
    const pwd =req.body.pwd;

      request.query("select * from userb where email='"+username+"' and password ='"+pwd+"'", function (error,rows) {
      if (error) throw error;
      req.flash("success", "successfuly Signed up");
      req.flash("incorrect", "incorrect");
       console.log(username); 
      if(rows.recordset.length)
      {
                    request.query("select userid from userb where email='"+username+"'", function (error,rows1) {
      if (error) throw error;
                  
              console.log(rows1.recordset[0].userid);
              res.cookie("value",rows1.recordset[0].userid);

              console.log(req.cookies.value);
      sql.close();
     return res.render('main', {message: req.flash('success'),disable:" " });
   });
           
    }

          else
    {

        sql.close();
       
 return res.render('loginsignup', {message: req.flash('incorrect') });
    }
  });
    });
    });
router.post('/act', function (req, res) {
    
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
    const name = req.body.name;
      request.query("select * from book where name='"+name+"'", function (error,rows2) {
      if (error) throw error;
      
       console.log(name); 
      if(!rows2.recordset.length)
      {
      sql.close();
     return res.render('search', {message: "problem" });
           
    }
      else
    {
       request.query("select *  from [dbo].["+req.cookies.value+"] where name='"+name+"'", function (error,rows4) {
      if (error) throw error;
      console.log(rows4.rowsAffected[0]);
      if(rows4.rowsAffected[0])
      {

       request.query("UPDATE [dbo].[1] SET [quantity] = [quantity]+1,[total] = [price]*([quantity]+1) where name='"+name+"'", function (error,rows4) {
      if (error) throw error;
      });
      } 
      else
      {   
      console.log(req.body.image);  
      request.query("INSERT INTO [dbo].["+req.cookies.value+"] values('"+req.body.name+"','"+req.body.image+"',"+req.body.price+",1,"+req.body.price+")", function (error,rows) {
      if (error) throw error;
    });
    }
      request.query("select sum(total) as s1 from [dbo].["+req.cookies.value+"]", function (error,rows1) {
      if (error) throw error;
      request.query("select *  from [dbo].["+req.cookies.value+"]", function (error,rows3) {
      if (error) throw error;        
            sql.close();
     return res.render('bill', {message1: rows1.recordset[0].s1,obj: rows3});
      });
    });
    });  
    }

  });
    });
    });




router.post('/add2', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
    const username = req.body.username;
    const pwd =req.body.pwd;

      request.query("select * from book", function (error,rows) {
      if (error) throw error;
      console.log("hello"+req.cookies.value+"hello"); 
        sql.close();
        if(typeof(req.cookies.value) == "undefined")
        return res.render('search', { obj : rows,disable:'disabled'});
        else
        return res.render('search', { obj : rows,disable:' '});  

  });
    });
    });
router.post('/add3', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
    const username = req.body.username;
    const pwd =req.body.pwd;

      request.query("select * from book", function (error,rows) {
      if (error) throw error; 
        sql.close();
        return res.render('search1', { obj : rows,disable:' '});  

  });
    });
    });

router.post('/logout',function(req,res){

    res.clearCookie('value'); 
    return res.render('main1',{message:'logout',disable:"disabled "});

});

router.post('/delete', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
    request.input('id', sql.Int, req.params.id)
      .query("delete from userb where userid="+req.cookies.value+"", function (err, result) {

        if (err) {
          console.log(err);
          res.send(err);
        }

        request.query("drop table [dbo].["+req.cookies.value+"]",function(err){
                    sql.close();
            res.clearCookie('value'); 
            return res.render('loginsignup',{message:'account deleted'});

        });
      });
  });
});


router.post('/profile',function(req,res,next){

    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    sql.connect(config,function(err){
            if (err)
      console.log(err);

    var request = new sql.Request();

            request.query("select *  from userb where userid ="+req.cookies.value+"", function (error,rows3) {
      if (error) throw error;        
            sql.close();
     return res.render('profile', {obj: rows3});
      });
    });
});
router.post('/profile1',function(req,res,next){

    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    sql.connect(config,function(err){
            if (err)
      console.log(err);

    var request = new sql.Request();
    console.log(req.body.add);

                      request.query("UPDATE [dbo].[userb] SET [name] ='"+req.body.username+"',[address] = '"+req.body.add+"',[mobno] = "+req.body.mobno+" where userid ="+req.cookies.value+"", function (error,rows3) {
      if (error) throw error;        
      });

            request.query("select *  from userb where userid ="+req.cookies.value+"", function (error,rows3) {
      if (error) throw error;        
            sql.close();
     return res.render('profile', {obj: rows3});
      });


    });
  });

router.post('/cart',function(req,res,next){

    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    sql.connect(config,function(err){
            if (err)
      console.log(err);

    var request = new sql.Request();

      request.query("select sum(total) as s1 from [dbo].["+req.cookies.value+"]", function (error,rows1) {
      if (error) throw error;
      request.query("select *  from [dbo].["+req.cookies.value+"]", function (error,rows3) {
      if (error) throw error;        
            sql.close();
     return res.render('bill', {message1: rows1.recordset[0].s1,obj: rows3});
      });
    });
      });


    });


router.post('/home',function(req,res){

  return res.redirect('main',{message: " ",disable:" "});

});
router.post('/login',function(req,res){

  return res.render('loginsignup',{message: "welcome"});
});




router.post('/search', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
    const name = req.body.name;
      console.log(name);
      request.query("select * from book where [name]='"+name+"' or [publish]='"+name+"'or [genres]='"+name+"'or [author]='"+name+"'", function (error,rows) {
      if (error) throw error;
      console.log("hello"+name+"hello"); 
        sql.close();
        if(typeof(req.cookies.value) == "undefined")
        return res.render('search', { obj : rows,disable:'disabled'});
        else
        return res.render('search', { obj : rows,disable:' '});  
});
});
});

router.post('/remove', function (req, res, next) {

      var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    // connect to your database 

  sql.connect(config, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
  
      request.query("delete from [dbo].["+req.cookies.value+"] where name='"+req.body.name+"' and quantity=1", function (err, result) {

        if (err) {
          console.log(err);
        }
       request.query("UPDATE [dbo].[1] SET [quantity] = [quantity]-1,[total] = [price]*([quantity]-1) where name='"+req.body.name+"'", function (error,rows4) {
      if (error) throw error;
      });

        request.query("select sum(total) as s1 from [dbo].["+req.cookies.value+"]", function (error,rows1) {
      if (error) throw error;
      request.query("select *  from [dbo].["+req.cookies.value+"]", function (error,rows3) {
      if (error) throw error;        
            sql.close();
     return res.render('bill', {message1: rows1.recordset[0].s1,obj: rows3});
      });
      });
  });
});
});

module.exports = router;

router.post('/admin',function(req,res,next){

 var sql =require("mssql");

 var config = require('../config/db');

 sql.connect(config, function(err){
      if(err)
        console.log(err);

      var request = new sql.Request();

    const username = req.body.username;
    const pwd =req.body.pwd;

           request.query("select * from admin where name='"+username+"' and password ='"+pwd+"'", function (error,rows) {
      if (error) throw error;
      req.flash("success", "successfuly Signed up");
      req.flash("incorrect", "incorrect");
       console.log(username); 
      if(rows.recordset.length)
      {
        sql.close();
       
     return res.render('admin', {message: req.flash('success'),disable:" " });

           
    }

          else
    {

        sql.close();
       
 return res.render('admin1', {message: req.flash('success') });
    }
  });

 });
});

router.post('/removebook', function (req, res, next) {

      var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    // connect to your database 

  sql.connect(config, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
  
      request.query("delete from book where name='"+req.body.name+"'", function (err, result) {   
            sql.close();
     return res.render('admin', {message: "successfuly remove",disable: " " });
      });
      });
  });
router.post('/book',function(req,res){

  return res.render('book',{message: " ",disable:" "});

});

router.post('/addbook', function (req, res) {
    
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db');

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
    const name = req.body.name;

          request.query("select * from book", function (error,rows) {
      if (error) throw error;

      request.query("select * from book where name='"+req.body.name+"'", function (error,rows2) {
      if (error) throw error;
      
       console.log(name); 
      if(rows2.recordset.length)
      {
      sql.close();
     return res.render('search1', {message: "book already there",obj : rows });
           
    }
      else
    {
      request.query("INSERT INTO book values('"+req.body.name+"','"+req.body.publish+"','"+req.body.genres+"','"+req.body.author+"','"+req.body.image+"')", function (error,rows1) {
      if (error) throw error;
            sql.close();
     return res.render('search1', {message: "add" , obj: rows});
    });
    }

    }); 
    });
}); 
    });