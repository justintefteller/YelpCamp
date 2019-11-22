const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");
const port       = 5002;
const options    = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
};
mongoose.connect("mongodb://localhost/yelp_camp", options, function(err){
    if(err) {
        throw err
    }
    console.log('Connected to MongoDB');
})
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//         name: "Salmon Creek",
//         image: "https://image.shutterstock.com/image-photo/fire-night-600w-452513506.jpg",
//         description: "Wow soo pretty"
//     },(err, campground) => {
//     if(err){
//         throw err
//     } else {
//         console.log(campground);
//     }
// });


app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            throw err
        }else {
            res.render("index", {campgrounds:allCampgrounds})
        }
    });
});

app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            throw err
        } else {
            res.redirect("/campgrounds");
        }    
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            throw err
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.delete("/campground/:id", function(req, res){
    Campground.deleteOnce(req.params.id, function(err, deletedCampground){
        if(err){
            throw err
        } else {
            res.redirect("/campgrounds");
        }
    })
})

app.set('port', process.env.PORT || port); // set express to use this port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});