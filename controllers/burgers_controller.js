var express = require('express');
var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        console.log(data);
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/burgers", function(req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, "0"
    ], function() {
        res.redirect("/");
    });
});

router.post("/update/:id", function(req, res) {
    var condition = "id = " + req.params.id;

     console.log("condition", condition);
    burger.updateOne({
        devoured: true
    }, condition, function() {
        console.log(req.body);
        res.redirect("/");
    });
});  
  

router.post('/delete/:id', function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
        
    burger.deleteOne(condition, function() {
        res.redirect('/');
    });
});
module.exports = router;