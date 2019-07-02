var app = require("express")(); 
var bodyParser = require("body-parser"); 

//Set view engine to ejs
app.set("view engine", "ejs"); 

//Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views"); 

//Use body-parser
app.use(bodyParser.urlencoded({ extended: false })); 

//Instead of sending Hello World, we render index.ejs
app.get("/", (req, res) => { res.render("index") }); 

app.listen(8080, () => { console.log("Server online on http://localhost:8080"); });