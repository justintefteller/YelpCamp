const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");
const port       = 5001;
const seedDB      = require("./seeds");
const options    = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
};
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require('passport-local-mongoose');
const User = require("./models/user");

const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const authRoutes = require("./routes/index");
const flash = require('connect-flash');

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", options, function(err){
    if(err) {
        throw err
    }
    console.log('Connected to MongoDB');
})
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());
app.use(require("express-session")({
    secret: "Von isn't my real name",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//adds user to every route and template
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

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


app.use(authRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.set('port', process.env.PORT || port); // set express to use this port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});