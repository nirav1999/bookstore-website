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
  "server":"localhost:8000" ,
  "database": "bestproject"
});

var result;

/* POST Add page. */

//----------------------------------
//----------------------------------
//---------------------------------
router.post('/add', function (req, res) {  
      req.flash("welcome", "welcome");
    // connect to your database
    con.connect( function (err) {
        if (err) console.log(err);
        // create Request object
        const email = req.body.email;
        const username = req.body.username;
        const pwd =req.body.pwd;

        req.flash("success", "successfulLy Signed up");
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
                    
                  
                    return res.render('main1', {message: 'welcome' ,disable:" ", error:""});            
                   
          });
          }   
          else
          {     
              return res.render('main1', {message: 'welcome' , error:"incorrect register"});
          }

    });       // send records as a response
  });
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
       console.log(username); 
      if(rows.length)
      {
                   con.query("select userid from userb where email='"+username+"'", function (error,rows1) {
      if (error) throw error;
                  
              console.log(rows1[0].userid);
              res.cookie("value",rows1[0].userid);

              console.log(req.cookies.value);
      
     return res.render('main1', {message: "User" , error: "" });
   });
           
    }

          else
    {

        
       
 return res.render('main1', {message: 'welcome' ,error: "incorrect email or password"});
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
      console.log(name);
      con.query("select * from book where name='"+name+"'", function (error,rows2) {
            if (error) throw error;

            console.log(rows2); 
            if(!rows2.length)
            {
                return res.render('main1', {message: "User", error: "cannot find book "+ name });
            }
            else
            {
                con.query("select *  from cart where c_id="+req.cookies.value+" and b_id="+rows2[0].b_id+"", function (error,rows4) {
                      if (error) throw error;
                      console.log(rows4.length);
                      if(rows4.length)
                      {
                          con.query("UPDATE cart SET quantity = quantity+1, total="+rows2[0].price+"*quantity where c_id="+req.cookies.value+" and b_id="+rows2[0].b_id+"" , function (error,rows4) {
                                if (error) throw error;
                          });
                      } 
                      else
                      {   
                        console.log(req.body.image);  
                        con.query("INSERT INTO  cart values("+req.cookies.value+","+rows2[0].b_id+",1,"+rows2[0].price+")", function (error,rows) {
                              if (error) throw error;
                        });
                      }
                con.query("select sum(total) as s1 from cart where c_id="+req.cookies.value+"", function (error,rows1) {
                    if (error) throw error;
                    con.query("SELECT book.name,book.price,cart.quantity,cart.total as total FROM `cart`,`book` where c_id="+req.cookies.value+" and cart.b_id=book.b_id ", function (error,rows3) {
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
    con.connect({json: true }, function (err) {
    
        if (err) console.log(err);

           
    const username = req.body.username;
    const pwd =req.body.pwd;

     con.query("select * from book", function (error,rows) {
      if (error) throw error;
      console.log("hello"+req.cookies.value+"hello");
      
      console.log(rows);
        
        if(typeof(req.cookies.value) == "undefined")
        return res.render('search', { obj : rows,message:"no"});
        else
        return res.render('search', { obj : rows,message:"yes"});  

});
});
});

//--------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------
router.post('/add3', function (req, res) {
   
  
        req.flash("welcome", "welcome");

      
    
        con.connect( function (err) {
    
        if (err) console.log(err);

          const username = req.body.username;
          const pwd =req.body.pwd;

           con.query("select * from book", function (error,rows) {
            if (error) throw error; 
              
              return res.render('search1', { obj : rows,message:'yes'});  

  });
  });
  });

router.post('/logout',function(req,res){

    res.clearCookie('value'); 
    return res.render('main1',{message:'welcome',disable:"disabled",error:"logout"});

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
            return res.render('main1',{message:'welcome',error:"account deleted"});

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
            
     return res.render('main1', {message: 'User',error:""});
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


     con.query("select (sum(quantity)*1000) as s1 from cart where c_id="+req.cookies.value+"", function (error,rows1) {
      if (error) throw error;
     con.query("SELECT book.name,book.price,cart.quantity,cart.total as total FROM `cart`,`book` where c_id="+req.cookies.value+" and cart.b_id=book.b_id ", function (error,rows3) { 
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
  return res.render('main1',{message: "User",disable:" ", error: ""});
  else{  return res.render('main1',{message:'welcome',disable:"disabled ", error: ""});
}
});

router.post('/admhome',function(req,res){

  return res.render('main1',{message: "success",disable:" ", error: ""});
}
);

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
   req.flash("welcome", "welcome");

      
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
        return res.render('search', { obj : rows,message:'no'});
        else
        return res.render('search', { obj : rows,message:'yes'});  
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
    const name = req.body.name;
      console.log(name);

    con.query("select * from book where name='"+name+"'", function (error,rows2) {
            if (error) throw error;

            console.log(rows2); 
            if(!rows2.length)
            {
                return res.render('main1', {message: "User", error: "cannot find book "+ name });
            }
            else
            {
              con.query("delete from  cart where c_id="+req.cookies.value+" and b_id="+rows2[0].b_id+" and quantity=1", function (err, result) {
              if (err) {
                  console.log(err);
              }
                con.query("UPDATE cart SET quantity = quantity-1, total="+rows2[0].price+"*quantity where c_id="+req.cookies.value+" and b_id="+rows2[0].b_id+"", function (error,rows4) {
                if (error) throw error;
                });

                 con.query("select sum(total) as s1 from cart where c_id="+req.cookies.value+"", function (error,rows1) {
                if (error) throw error;
               con.query("SELECT book.name,book.price,cart.quantity,cart.total as total FROM `cart`,`book` where c_id="+req.cookies.value+" and cart.b_id=book.b_id ", function (error,rows3) {
                if (error) throw error;        
                      
               return res.render('bill', {message1: rows1[0].s1,obj: rows3});
                });
                });
            });
            }     
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
    console.log(username);

          con.query("select * from admin where name='"+username+"' and password ='"+pwd+"'", function (error,rows) {
      if (error) console.log(error);
      req.flash("success", "successfuly Signed up");
      req.flash("incorrect", "incorrect");
       console.log(username); 
      if(rows.length)
      {
     return res.render('main1', {message: 'success',disable:"visible" , error:""});      
    }
          else
    {    
          return res.render('main1', {message: 'welcome',disable:"hidden" ,error:"incorrect login" });
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

    con.query("select * from book where name='"+req.body.name+"'", function (error,rows2) {
            if (error) throw error;

            console.log(rows2); 
            if(!rows2.length)
            {
                return res.render('main1', {message: "User", error: "cannot find book "+ name });
            }
            else
            {
                con.query("delete from book where name='"+req.body.name+"'", function (err, result) {

                con.query("delete from cart where b_id='"+rows2[0].b_id+"'", function (err, result1) {   
      
                return res.render('main1', {message: "success",disable: " " , error: "book removed: "+req.body.name});
              });
            });
            }     
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
    
  
      req.flash("welcome", "welcome");

      
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
      
     return res.render('search1', {message: "yes",obj : rows });
           
    }
      else
    {
     con.query("INSERT INTO `book`(`name`, `publish`, `genres`, `author`, `price`) values('"+req.body.name+"','"+req.body.publish+"','"+req.body.genres+"','"+req.body.author+"',"+req.body.price+")", function (error,rows1) {
      if (error) throw error;
      con.query("select * from book", function (error,rows4) {
        if (error) throw error;
     return res.render('search1', {message: "yes" , obj: rows4});
      });
    });
    }

    }); 
    });
}); 
    });