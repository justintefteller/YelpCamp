const mongoose = require("mongoose");
const Campground = require("./models/campground");

const Comment = require("./models/comment");

const data = [
   { 
       name: "Cloud's Rest", 
       image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
       description: "Cool place"
    },
    { 
       name: "Cetec's Rest",
       image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
       description: "Well Well Well"
    },
    { 
       name: "Justin's Rest", 
       image: "https://images.unsplash.com/photo-1546890975-7596e98cdbf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
       description: "Wow place"
    },
    {
        name: "Bad Ass Place",
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description: "This place is dope!"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else { 
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great!",
                            author: "Justin"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            }else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
                
                });
            });
        });
    });
}
module.exports = seedDB;