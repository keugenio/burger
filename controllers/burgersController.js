var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// when default call to api called, return all burgers in database back to index.handlebars
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

// when post route called, call insert function of burger object. pass it the new burger object to be created
router.post("/api/burgers", function(req, res) {
  burger.insertOne([
    "burger_name", "devoured", "image"
  ], [
    req.body.name, req.body.devoured, req.body.image
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// when delete route called, call delete function of burger object. pass it the id of the burger to be deleted
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.delete(
    condition, function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.deletedId });
  });
});

// when put route called, call update function of burger object. pass it the id of the burger to be deleted
// and new devoured state
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
