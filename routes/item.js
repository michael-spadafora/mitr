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
router.get('/item/:id', async function(req, res, next) {
    console.log("item query: " + req.params.id)
    if (!req.session.user) {
        res.redirect('/login')
    }
    else {
        let id = req.params.id
        let item = await itemController.getItem(id)
        res.send(item)
    }
});

router.post('/additem', async function(req, res, next) {
    if (!req.session.user) {
        console.log("add item failed due to lack of session")
        res.redirect('/login')
    }
    else {
        let content = req.body.content
        let childType = req.body.childType
        let username = req.session.user
        let re = await itemController.addItem(content, childType, username)
        console.log("add item response: " + re.id + ", " + re.status)
        res.send(re)
    }
})

router.post('/search', async function(req, res, next) {
    //get timestamp and limit
    let timestamp = req.body.timestamp
    let limit = req.body.limit
  
    if (!timestamp) {
      timestamp = Math.floor(new Date() / 1000)    
    }
    if (!limit) {
      limit = 25
    }
    if (limit > 100) {
      limit = 100
    }
    let re = await itemController.search(timestamp,limit)

    res.send(re)
  });
  

module.exports = router;
