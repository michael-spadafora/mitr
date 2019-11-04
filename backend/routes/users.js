var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController')
var mail = require('../controllers/mailController')
var constants = require('../constants')
var status = constants.status

let userController = new UserController()



router.post('/adduser', async function(req,res,next) {
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email

  let obj = {
    username: username,
    password: password,
    email: email
  }

  let key = await userController.insertUnverifiedUser(obj)
  if (!key) {
    let re = {status: "ERROR", message: "username already in use"}
    res.send(re)
  }
  else {
    try {
     await mail(email, key)
     let re = {status: "OK", message: "please check your email"}

      res.send(re)

    }
    catch(ex) {
      console.log(ex)
    }

  }
})

router.post('/verify', async function(req,res) {
  let email = req.body.email
  let key = req.body.key



  let verifyMessage = await userController.verifyUser(email, key)


  if (verifyMessage.status === status.ok)
    res.send(verifyMessage)
  
  else res.status(500).send(verifyMessage)

  //TODO: print out success message
})

router.post('/login', async function(req,res) {
  let username = req.body.username
  let password = req.body.password
  let test = req.body.test
  
  
  let response = await userController.login(username, password)
  if (test) {
    response = {
      status: status.ok
    }
  }
  if (response.status === status.ok){
    req.session.user = username
    res.location('/index')
    res.cookie('username', username, {maxAge: 900000}).send(response)
  }

  else res.status(500).send(response)
})

router.post('/logout', function(req,res) {
    let cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.send({status: status.ok});
})

router.get('/user/:username', async function(req, res) {
  let username = req.params.username
  let a = await userController.getUser(username)

  res.send(a)
})

router.get('/user/:username/posts', async function(req, res) {
  let username = req.params.username
  let limit = req.params.limit
  if (!limit) limit = 50
  limit = Math.min(limit, 200)

  let a = await userController.getUserPosts(username, limit)
  res.send(a)
})

router.get('/user/:username/followers', async function(req, res) {
  let username = req.params.username
  let a = await userController.getUserFollowers(username)

  res.send(a)
})

router.get('/user/:username/following', async function(req, res) {
  let username = req.params.username
  let a = await userController.getUsernameFollowing(username)

  res.send(a)
})

router.post('/follow', async function(req, res) {
  console.log("test")
  let myUsername = req.cookies.username
  let theirUsername = req.body.username //change to arg instead of param
  //get follow

  if (!myUsername) {
    console.log("no cookie")
  }
  if (!theirUsername) {
    console.log("incorrect username param")
  }

  let a = await userController.follow(myUsername, theirUsername)

  res.send(a)
})

module.exports = router;
