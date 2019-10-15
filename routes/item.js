var express = require('express');
var router = express.Router();
var ItemController = require('../controllers/itemController')

let childType = {
    retweet: "retweet",
    reply: "reply"
}


/* GET users listing. */
router.get('/:id', function(req, res, next) {
    res.send(req.id);
});

router.post('/additem', async function(req, res, next) {
    let content = req.body.content
    let childType = req.body.childType

})