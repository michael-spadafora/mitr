var express = require('express');
var router = express.Router();
var ItemController = require('../controllers/itemController')
var constants = require('../constants')
var status = constants.status

let childType = {
    retweet: "retweet",
    reply: "reply"
}

let itemController = new ItemController()


/* GET users listing. */
router.get('/item', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login')
    }
    else {
        res.send(req.query.id);
    }
});

router.post('/additem', async function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login')
    }
    else {
        let content = req.body.content
        let childType = req.body.childType
        let username = req.session.user
        let re = await itemController.addItem(content, childType, username)
        res.send(re)
    }
})

module.exports = router;
