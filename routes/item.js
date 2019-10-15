var express = require('express');
var router = express.Router();
var itemController = require('../')

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    
    res.send('respond with a resource');
});