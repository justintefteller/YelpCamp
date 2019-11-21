const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5002;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let campgrounds = [
    { name: "Salmon Creek", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
    { name: "Salmon Creek", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
    { name: "Salmon Creek", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
    { name: "Salmon Creek", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
    { name: "Justin Creek", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"},
    { name: "Harry Creek", image: "https://live.staticflickr.com/7150/6495176815_05d090be21_m.jpg"}
];


app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.set('port', process.env.PORT || port); // set express to use this port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});