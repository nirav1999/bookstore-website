var express = require('express');
var router = express();
const bodyParser = require("body-parser");
router.set('view engine', 'ejs');

var db = require('../config/db');
console.log(db);
var sql = require('mysql');
var  flash= require('connect-flash');
var session = require('express-session');
var flag=0;
var cookieParser = require('cookie-parser');

router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
router.use(flash());
router.use(cookieParser());
var con = sql.createConnection({
  "host" : "localhost",
  "user": "root",
  "server":"localhost:3306",
  "database": "bestproject"
});

var result;

/* POST Add page. */

//----------------------------------
//----------------------------------
//---------------------------------
router.post('/add', function (req, res) {  
      req.flash("welcome", "welocme");
    // connect to your database
    con.connect( function (err) {
        if (err) console.log(err);
        // create Request object
        const email = req.body.email;
        const username = req.body.username;
        const pwd =req.body.pwd;

        req.flash("success", "successfuly Signed up");
        req.flash("incorrect", "incorrect");

        con.query("select * from userb where email='"+email+"'", function (error,results) {
            if (error) throw error;

            console.log(results); 
            if(!results.length)
            {
                con.query("Insert into userb(name,password,email,address,mobno)  VALUES ('"+req.body.username+"','"+req.body.pwd+"','"+req.body.email+"','"+req.body.add+"','"+req.body.mobno+"')" , function (error, results, fields) {
                      if (error) throw error;

                      var flag=1;
           
                 });
                con.query("select userid from userb where email='"+email+"'", function (error,rows1) {
                    if (error) throw error;
                  
                    console.log(rows1[0].userid);
                    res.cookie("value",rows1[0].userid);

                    console.log(req.cookies);
                    con.query("CREATE TABLE `"+rows1[0].userid+"` (`name` varchar(50) DEFAULT NULL, `price` int(6) DEFAULT NULL,`quantity` int(11) DEFAULT NULL,`total` int(11) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;", function (error,rows) {
                    if (error) throw error;
                  
                    return res.render('main', {message: req.flash('success') ,disable:" "});            
                    })
                });
          }   
          else
          {     
              return res.render('loginsignup', {message: req.flash('incorrect') });
          }

      })
    });       // send records as a response
  });

//-----------------------------------------------------------------------------
//------------------------------------------------------------------------------
//--------------------------------------------------------------------------------  
router.post('/add1', function (req, res) {
      req.flash("welcome", "welocme"); 
    // connect to your database
    con.connect( function (err) {
        if (err) console.log(err);
       
    const username = req.body.username;
    const pwd =req.body.pwd;

     con.query("select * from userb where email='"+username+"' and password ='"+pwd+"'", function (error,rows) {
      if (error) throw error;
      req.flash("success", "successfuly Signed up");
      req.flash("incorrect", "incorrect");
       console.log(username); 
      if(rows.length)
      {
                   con.query("select userid from userb where email='"+username+"'", function (error,rows1) {
      if (error) throw error;
                  
              console.log(rows1[0].userid);
              res.cookie("value",rows1[0].userid);

              console.log(req.cookies.value);
      
     return res.render('main', {message: req.flash('success'),disable:" " });
   });
           
    }

          else
    {

        
       
 return res.render('loginsignup', {message: 'incorrect' });
    }
  });
    });
      });

//--------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
router.post('/act', function (req, res) {
  req.flash("welcome", "welocme");
    // connect to your database
  con.connect( function (err) {
    
      if (err) console.log(err);
       
      const name = req.body.name;
      con.query("select * from book where name='"+name+"'", function (error,rows2) {
            if (error) throw error;

            console.log(name); 
            if(!rows2.length)
            {
                return res.render('search', {message: "problem" });
            }
            else
            {
                con.query("select *  from `"+req.cookies.value+"` where name='"+name+"'", function (error,rows4) {
                      if (error) throw error;
                      console.log(rows4.length);
                      if(rows4.length)
                      {
                          con.query("UPDATE `"+req.cookies.value+"` SET total=price*(quantity+1),quantity = quantity+1 where name='"+name+"'", function (error,rows4) {
                                if (error) throw error;
                          });
                      } 
                      else
                      {   
                        console.log(req.body.image);  
                        con.query("INSERT INTO `"+req.cookies.value+"` values('"+req.body.name+"',"+req.body.price+",1,"+req.body.price+")", function (error,rows) {
                              if (error) throw error;
                        });
                      }
                con.query("select sum(total) as s1 from `"+req.cookies.value+"`", function (error,rows1) {
                    if (error) throw error;
                    con.query("select *  from `"+req.cookies.value+"`", function (error,rows3) {
                          if (error) throw error;
                          console.log(rows3);             
                          return res.render('bill', {message1: rows1[0].s1,obj: rows3});
                    });
                });
              });  
            }

      });
  });
});

//---------------------------------------------------
//---------------------------------------------------
//---------------------------------------------------
router.post('/add2', function (req, res) { 
    // connect to your database
    con.connect({json: true }, function (err) {
    
        if (err) console.log(err);

        // create Request object

           
    const username = req.body.username;
    const pwd =req.body.pwd;

     con.query("select * from book", function (error,rows) {
      if (error) throw error;
      console.log("hello"+req.cookies.value+"hello");
      
      console.log(rows);
        
        if(typeof(req.cookies.value) == "undefined")
        return res.render('search', { obj : rows,disable:'disabled'});
        else
        return res.render('search', { obj : rows,disable:' '});  

  });
    });
    });

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------
router.post('/add3', function (req, res) {
   
  
      req.flash("welcome", "welcome");

      
    // connect to your database
    con.connect( function (err) {
    
        if (err) console.log(err);

        // create Request object

           
    const username = req.body.username;
    const pwd =req.body.pwd;

     con.query("select * from book", function (error,rows) {
      if (error) throw error; 
        
        return res.render('search1', { obj : rows,disable:' '});  

  });
    });
      });

router.post('/logout',function(req,res){

    res.clearCookie('value'); 
    return res.render('main1',{message:'logout',disable:"disabled "});

});

//-----------------------------------------------------
//----------------------------------------------------
//--------------------------------------------------------
router.post('/delete', function (req, res, next) {
   
    // connect to your database
    con.connect(db, function (err) {
    if (err)
      console.log(err);
     con.query("delete from userb where userid="+req.cookies.value+"", function (err, result) {

        if (err) {
          console.log(err);
          res.send(err);
        }

       con.query("drop table `"+req.cookies.value+"`",function(err){
                    
            res.clearCookie('value'); 
            return res.render('loginsignup',{message:'account deleted'});

        });
      });
  });
   });

//-----------------------------------------------------
//-----------------------------------------------------
//------------------------------------------------------
router.post('/profile',function(req,res,next){
    // connect to your database
    con.connect(function(err){
            if (err)
      console.log(err);
           con.query("select *  from userb where userid ="+req.cookies.value+"", function (error,rows3) {
      if (error) throw error;        
            
     return res.render('profile', {obj: rows3});
      });
    });
});

//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
router.post('/profile1',function(req,res,next){  
    // connect to your database
    con.connect(function(err){
            if (err)
      console.log(err);


    console.log(req.body.add);

                     con.query("UPDATE userb SET name ='"+req.body.username+"',address = '"+req.body.add+"',mobno = "+req.body.mobno+" where userid ="+req.cookies.value+"", function (error,rows3) {
      if (error) throw error;        
      });

           con.query("select *  from userb where userid ="+req.cookies.value+"", function (error,rows3) {
      if (error) throw error;        
            
     return res.render('profile', {obj: rows3});
      });


    });
     });

//-------------------------------------------------
//--------------------------------------------------
//-------------------------------------------------     
router.post('/cart',function(req,res,next){    
    // connect to your database
    con.connect(function(err){
            if (err)
      console.log(err);


     con.query("select sum(total) as s1 from `"+req.cookies.value+"`", function (error,rows1) {
      if (error) throw error;
     con.query("select *  from `"+req.cookies.value+"`", function (error,rows3) {
      if (error) throw error;        
            
     return res.render('bill', {message1: rows1[0].s1,obj: rows3});
      });
    });
      });
        });

//----------------------------------------------
//---------------------------------------------
//--------------------------------------------
router.post('/home',function(req,res){

  if(typeof(req.cookies.value) != "undefined")
  return res.render('main',{message: " ",disable:" "});
  else{  return res.render('main1',{message:'logout',disable:"disabled "});
}



});

//-----------------------------------------
//----------------------------------------
//----------------------------------------
router.post('/login',function(req,res){

  return res.render('loginsignup',{message: "welcome"}); 
});

//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
router.post('/search', function (req, res) {
   req.flash("welcome", "welocme");

      
    // connect to your database
    con.connect( function (err) {
    
        if (err) console.log(err);

        // create Request object     
    const name = req.body.name;
      console.log(name);
     con.query("select * from book where name='"+name+"' or publish='"+name+"'or genres='"+name+"'or author='"+name+"'", function (error,rows) {
      if (error) throw error;
      console.log("hello"+name+"hello"); 
        
        if(typeof(req.cookies.value) == "undefined")
        return res.render('search', { obj : rows,disable:'disabled'});
        else
        return res.render('search', { obj : rows,disable:' '});  
});
});
 });
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
router.post('/remove', function (req, res, next) {
    // connect to your database
    con.connect( function (err) {
    if (err)
      console.log(err);


  
     con.query("delete from `"+req.cookies.value+"` where name='"+req.body.name+"' and quantity=1", function (err, result) {

        if (err) {
          console.log(err);
        }
      con.query("UPDATE `"+req.cookies.value+"` SET quantity = quantity-1,total = price*(quantity-1) where name='"+req.body.name+"'", function (error,rows4) {
      if (error) throw error;
      });

       con.query("select sum(total) as s1 from `"+req.cookies.value+"`", function (error,rows1) {
      if (error) throw error;
     con.query("select *  from `"+req.cookies.value+"`", function (error,rows3) {
      if (error) throw error;        
            
     return res.render('bill', {message1: rows1[0].s1,obj: rows3});
      });
      });
  });
});
 });

module.exports = router;
//-----------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
router.post('/admin',function(req,res,next){

      
    // connect to your database
    const username = req.body.username;
    const pwd =req.body.pwd;

          con.query("select * from admin where name='"+username+"' and password ='"+pwd+"'", function (error,rows) {
      if (error) throw error;
      req.flash("success", "successfuly Signed up");
      req.flash("incorrect", "incorrect");
       console.log(username); 
      if(rows.length)
      {
     return res.render('admin', {message: req.flash('success'),disable:" " });      
    }
          else
    {    
          return res.render('admin1', {message: req.flash('success') });
    }
  });
  });


//---------------------------------------------------------------
//-----------------------------------------------------------
//----------------------------------------------------------  
router.post('/removebook', function (req, res, next) {    
    // connect to your database
    con.connect( function (err) {
    if (err)
      console.log(err);

    
  
     con.query("delete from book where name='"+req.body.name+"'", function (err, result) {   
            
     return res.render('admin', {message: "successfuly remove",disable: " " });
      });
      });
        });

 //=------------------------------------------
 //------------------------------------------
 //--------------------------------------       
router.post('/book',function(req,res){

  return res.render('book',{message: " ",disable:" "});

});


//--------------------------------------------------------------
//----------------------------------------------------------------
//---------------------------------------------------------------------
router.post('/addbook', function (req, res) {
    
  
      req.flash("welcome", "welocme");

      
    // connect to your database
    con.connect( function (err) {
    
        if (err) console.log(err);

        // create Request object

           
    const name = req.body.name;

         con.query("select * from book", function (error,rows) {
      if (error) throw error;

     con.query("select * from book where name='"+req.body.name+"'", function (error,rows2) {
      if (error) throw error;
      
       console.log(name); 
      if(rows2.length)
      {
      
     return res.render('search1', {message: "book already there",obj : rows });
           
    }
      else
    {
     con.query("INSERT INTO book values('"+req.body.name+"','"+req.body.publish+"','"+req.body.genres+"','"+req.body.author+"','"+req.body.image+"')", function (error,rows1) {
      if (error) throw error;
      con.query("select * from book", function (error,rows4) {
        if (error) throw error;
     return res.render('search1', {message: "add" , obj: rows4});
      });
    });
    }

    }); 
    });
}); 
    });