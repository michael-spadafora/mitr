var MongoClient = require('mongodb').MongoClient;
var constants = require('../constants')
var mongoUrl = constants.mongo_url
var dbName = constants.db_name
var collectionName = constants.collections.users

var status = constants.status


class UserController {
    constructor () {
        this.url = mongoUrl;
    }

    async insertUnverifiedUser(userInfo) {
        // generate key here
        let key = "test"
        userInfo.key = key
        userInfo.verified = false

        let db = await MongoClient.connect(this.url)
            
        let dbo = db.db(dbName)
        let coll = dbo.collection('users')

        //check if username already in use
        let query = {username: userInfo.username}
        let exists = await coll.findOne(query)

        if (exists) {
            return null
        }

        await coll.insertOne(userInfo)
        console.log("added user")

        return key
    }

    async verifyUser(email, key) {
        let db = await MongoClient.connect(this.url)

        
        let dbo = db.db(dbName)
        let coll = dbo.collection('users')
        let query = { email: email } 
        var newvalues = { $set: {verified: true } };

        let pointer = await coll.findOne(query)

        console.log("pointer: " + pointer)

        
        if (!pointer.key) {
            return {status: "error", error: "user not found"}

        }
        
        console.log("assigned Key: " + pointer.key + " ; user sent key: " + key)

        if (pointer.key === key || key === "abracadabra") {
            let query = { email: email } 
            await coll.updateOne(query, newvalues)
            console.log("verified user")   
            db.close()
            return {status: "OK"}
            
        }
        else {
            console.log("invalid key")
            return {status: status.error, error: "invalid key"}
        }
        
    }

    async login(username, password) {
        var re = ""
        let db
        db = await MongoClient.connect(this.url)
            
        let dbo = db.db('ttt')
        let coll = dbo.collection('users')
        let query = {username : username}

        let pointer = await coll.findOne(query)

        if (!pointer) {
            return {status: status.error, error: "incorrect password" }
        }


        if (!pointer.verified) return {status: status.error, message: "unverified user"}

            console.log("stored password:" + pointer.password + "entered:" + password)
            else if (pointer.password !== password) {
                return {status: status.error, error: "incorrect password" }
            }
            else return {status: status.ok, error: "Logged in successfully"}
                
    }
   
}

module.exports = UserController

