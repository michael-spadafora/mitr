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
    let re = {status: "ERROR", error: "username already in use"}
    res.render('register', re)
  }
  else {
    try {
     await mail(email, key)
     let re = {status: "OK", message: "please check your email for registration key"}
      res.render('verify', re)
    }
    catch(ex) {
      console.log(ex)
    }

  }
})

router.post('/verify', async function(req,res) {
  let email = req.body.email
  let key = req.body.key

  console.log(req.body)

  console.log(req.body.key)

  let verifyMessage = await userController.verifyUser(email, key)

  console.log(verifyMessage)

  if (verifyMessage.status === status.ok) {
    res.render('login', verifyMessage)
  }
  else {
    res.render('verify', verifyMessage)
  }
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
  console.log(response)
  if (response.status === status.ok){
    req.session.user = username
    res.cookie('username', username, {maxAge: 900000})
    res.status = response.status
    res.statusMessage = response.message
    res.render('index', response)
  }


  else {
    res.status = response.status
    res.statusMessage = response.error
    res.error = response.error
    res.render('login', response)
  }
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

module.exports = router;
