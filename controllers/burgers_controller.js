// Required dependencies
var express = require('express');
var router = express.Router();

// Model import
var burger = require('../models/burger.js');

// Create routes
router.get('/', function(req, res) {
  burger.selectAll(function(data) {
    console.log(data);
    res.render('index', {data}); 
})
})

router.put('/burgers/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;
  
    burger.updateOne({
      devoured: true
    }, condition, function(data) {
      res.redirect('/');
    });
  });

  router.post('/burgers', function(req, res) {
    burger.insertOne([
      'burger_name'
    ], [
      req.body.burger_name
    ], function(data) {
      res.redirect('/');
    });
  });

  // Export routes 
module.exports = router;