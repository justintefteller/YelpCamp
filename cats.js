const mongoose = require("mongoose");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
mongoose.connect("mongodb://localhost/cat_app", options, function(error) {
    if(error){
        throw error;
    }
    console.log("Connected to Database")
});

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model("Cat", catSchema);
 
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat){
//     if(err){
//         throw err
//     }else {
//         console.log("Cat in db");
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Snow White",
//     age: 15,
//     temperament: "Nice"
// }, function(err, cat){
//     if(err){
//         throw err
//     } else {
//         console.log(cat);
//     }
// });

Cat.find({}, function(err, cats){
    if(err){
        console.log(err);
    }else{
        console.log(cats)
    }
});