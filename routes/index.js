var express = require('express');
var UserController = require('../controllers/userController')

var MongoClient = require('mongodb').MongoClient
var router = express.Router();


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });  
})

router.post('/search', function(req, res, next) {
  //get timestamp and limit
  let timestamp = req.body.timestamp
  let limit = req.body.limit

  if (!timestamp) {
    //default to now
  }

  if (!limit) {
    limit = 25
  }
  if (limit > 100) {
    limit = 100
  }
});



module.exports = router;
