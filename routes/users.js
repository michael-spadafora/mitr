var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController')

let userController = new UserController()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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

  console.log(req.body)

  console.log(req.body.key)

  let verifyMessage = await userController.verifyUser(email, key)

  console.log(verifyMessage)

  res.send(verifyMessage)

  //TODO: print out success message
})

router.post('/login', async function(req,res) {
  let username = req.body.username
  let password = req.body.password
  
  let response = await userController.login(username, password)
  console.log(response)
  if (response.status === 'OK'){
    res.cookie('username', username, {maxAge: 900000}).send(response)
    console.log("cookie created successfully")
  }

  else res.send(response)
})

router.post('/logout', function(req,res) {
    let cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.send({status: "OK"});
})

module.exports = router;
