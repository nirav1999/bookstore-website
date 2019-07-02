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

router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  router.use(flash());

var result;

/* GET home page. */
router.get('/show', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();

    // 模糊搜尋用法
    // const value = 'b'; // 關鍵字
    // request.input('username', sql.NVarChar(50), '%' + value + '%');
    // const fuzzySelect = 'select * from UserList where username like @username';

    request.query('select * from UserList', function (err, result) {

      if (err) {
        console.log(err)
        res.send(err);
      }
      // var rowsCount = result.rowsAffected;
      sql.close();
      res.render('index', {
        route: 'home',
        data: result.recordset
      });

    }); // request.query
  }); // sql.conn
}); // get /


/* GET Edit page. */
router.get('/edit/:id/', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
    request.input('id', sql.Int, req.params.id)
    request.query("select * from UserList where id=@id", function (err, result) {

      if (err) {
        console.log(err)
        res.send(err);
      }
      // var rowsCount = result.rowsAffected;
      sql.close();
      res.render('edit', {
        route: 'edit',
        data: result.recordset[0]
      });

    }); // request.query
  }); // sql.conn
});


/* POST Edit page. */
router.post('/update', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
    request.input('id', sql.Int, req.body.id)
      .input('username', sql.NVarChar(50), req.body.username)
      .input('pwd', sql.NVarChar(50), req.body.pwd)
      .input('email', sql.NVarChar(50), req.body.email)
      .query('update UserList set username=@username,pwd=@pwd,email=@email where id=@id', function (err, result) {

        if (err) {
          console.log(err);
          res.send(err);
        }
        sql.close();
        res.redirect('/');
      });
  });
});

/* GET Add page. */
router.get('/add', function (req, res, next) {
  res.render('add', {
    route: 'add',
  });
});


/* POST Add page. */
router.post('/add', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db')

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
            request.query("select userid from userb where email='"+email+"'", function (error,rows) {
      if (error) throw error;
                  
              console.log(rows.recordset[0].userid);
             request.query("CREATE TABLE [DBO].[5]([name] [nvarchar](10) NULL,[book] [nvarchar](10) NULL,[price] [nvarchar](10) NULL,[quantity] [nvarchar](10) NULL,[total] [nvarchar](10) NULL)", function (error,rows) {
              if (error) throw error;
                  sql.close();
            return res.render('main', {message: req.flash('success') });            
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
    var config = require('../config/db')

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
      if(!rows.recordset.length)
      {
      sql.close();
     return res.render('main', {message: req.flash('success') });
           
    }

          else
    {
        sql.close();
       
 return res.render('loginsignup', {message: req.flash('success') });
    }
  });
    });
    });
router.post('/act', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db')

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
    const name = req.body.name;
    const pwd =req.body.publish;

      request.query("select * from userb where username='"+name+"'", function (error,rows) {
      if (error) throw error;
      
       console.log(name); 
      if(!rows.recordset.length)
      {
      sql.close();
     return res.render('search', {message: "problem" });
           
    }

          else
    {
        sql.close();
        return res.render('loginsignup', {message: req.flash('success') });

    }
  });
    });
    });


router.post('/add2', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = require('../config/db')

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
    const username = req.body.username;
    const pwd =req.body.pwd;

      request.query("select * from book", function (error,rows) {
      if (error) throw error;
      console.log(rows.recordset[0].name); 
        sql.close();
        return res.render('search', { obj : rows});

  });
    });
    });
    
            // send records as a response



/* GET Delete page. */
router.get('/delete/:id', function (req, res, next) {

  sql.connect(db, function (err) {
    if (err)
      console.log(err);

    var request = new sql.Request();
    request.input('id', sql.Int, req.params.id)
      .query('delete from UserList where id=@id', function (err, result) {

        if (err) {
          console.log(err);
          res.send(err);
        }
        sql.close();
        res.redirect('/');
      });
  });
});
module.exports = router;