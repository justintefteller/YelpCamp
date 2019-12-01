const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

router.get("/", (req, res) => {
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            throw err
        }else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds})
        }
    });
});

router.post("/", middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {name: name, price: price, image: image, description: desc, author:author};

    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            throw err
        } else {
            res.redirect("/campgrounds");
        }    
    });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash('error', 'Campground not found');
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground: foundCampground});
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err){
            res.redirect('/campgrounds');
        }else {
            req.flash("success", "Campground updated")
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
        if(err){
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    });
});


module.exports = router;