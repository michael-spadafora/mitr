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
    // if (!req.session.user) {
    //   console.log("not logged in")
    //     res.redirect('/login')
    // }
    // else {
        let id = req.params.id
        let re = await itemController.getItem(id)
        console.log(re.item.id)
        console.log(re.item.content)
        console.log(re.item.username)


        res.send(re)
    // }
});

router.post('/additem', async function(req, res, next) {
    if (!req.cookies.username) {
        console.log("add item failed due to lack of session")
        res.redirect('/login')
    }
    else {
        console.log("post by " + req.cookies.username)
        let content = req.body.content
        let childType = req.body.childType
        let username = req.cookies.username

        let re = await itemController.addItem(content, childType, username)
        console.log("add item response: " + re.id + ", " + re.status)
        res.send(re)
    }
})

router.post('/search', async function(req, res, next) {
    //get timestamp and limit
    let timestamp = req.body.timestamp
    let limit = req.body.limit

    console.log(timestamp)
    console.log(limit)

  
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
    console.log('items:' + re.items[0])

    res.send(re)
  });
  

module.exports = router;
