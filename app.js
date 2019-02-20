var express = require("express");
bodyParser = require("body-parser");
mongoose = require("mongoose");
app = express();

// APP CONFIG

mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
 

//MONGOOSE MODEL CONFIG

let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES

//INDEX

app.get( "/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs", function(req, res){
    Blog.find({}, function(error, blogs){
        if (error){
            console.log(error);
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE

app.get("/blogs/new", function (req, res) {
    res.render("new");
});

//CREATE ROOUTE

app.post("/blogs", function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            res.render("new")
        } else{
            res.redirect("/blogs");
        }
    })
    //redirect to index
})


//LISTEN

app.listen(3000, function(req, res){

console.log("server is running");

})

