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

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });  
})

router.get('/verify', function(req, res, next) {
  res.render('verify', { title: 'Verify Account' });  
})



module.exports = router;
