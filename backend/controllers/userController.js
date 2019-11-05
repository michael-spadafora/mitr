var MongoClient = require('mongodb').MongoClient;
var constants = require('../constants')
var mongoUrl = constants.mongo_url
var dbName = constants.db_name
var collectionName = constants.collections.users
var itemCollectionName = constants.collections.items

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
        userInfo.followers = []
        userInfo.following = []

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
            
        let dbo = db.db(dbName)
        let coll = dbo.collection('users')
        let query = {username : username}

        let pointer = await coll.findOne(query)

        if (!pointer) {
            return {status: status.error, error: "incorrect password" }
        }



        if (!pointer.verified) return {status: status.error, message: "unverified user"}

        else if (pointer.password !== password) {
            return {status: status.error, error: "incorrect password" }
        }
        else return {status: status.ok, error: "Logged in successfully"}
                
    }

    async getUser(username) {
        let db = await MongoClient.connect(this.url)

        
        let dbo = db.db(dbName)
        let coll = dbo.collection('users')
        let query = { username: username } 

        let pointer = await coll.findOne(query)

        console.log("pointer: " + pointer)

        
        if (!pointer.key) {
            return {status: status.error, error: "user not found"}
        }
        

        return {
            status: status.ok, 
            user: {
                email: pointer.email,
                followers: pointer.followers.length,
                following: pointer.following.length
        }}
    }

    async getUserPosts(username, limit) {
        let db = await MongoClient.connect(this.url)
        
        let dbo = db.db(dbName)
        let coll = dbo.collection(itemCollectionName)
        let query = { username: username } 

        let pointer = await coll.find(query).limit(limit).toArray()

        console.log("pointer: " + pointer)

        
        if (!pointer) {
            return {status: status.error, error: "posts not found"}
        }

        let itemIds = []
        
        for (let i = 0; i < pointer.length; i++) {
            itemIds.push(pointer[i]._id)
        }

        return {
            status: status.ok, 
            items: itemIds
        }
        
    }

    async getUserFollowers(username, limit) {
        let db = await MongoClient.connect(this.url)
        
        let dbo = db.db(dbName)
        let coll = dbo.collection(collectionName)
        //todo fix query
        let query = { username: username } 

        let pointer = await coll.find(query).limit(limit).toArray()

        console.log("pointer: " + pointer)

        
        if (!pointer) {
            return {status: status.error, error: "following not found"}
        }

        let followerUsernames = []
        
        for (let i = 0; i < pointer.length; i++) {
            followerUsernames.push(pointer[i].username)
        }

        return {
            status: status.ok, 
            users: followerUsernames
        }

    }

    async getUserFollowing(username, limit) {
        let db = await MongoClient.connect(this.url)
        
        let dbo = db.db(dbName)
        let coll = dbo.collection(collectionName)
        //todo fix this query
        let query = { username: username } 

        let pointer = await coll.find(query).limit(limit).toArray()

        console.log("pointer: " + pointer)

        
        if (!pointer) {
            return {status: status.error, error: "following not found"}
        }

        let followingUsernames = []
        
        for (let i = 0; i < pointer.length; i++) {
            followingUsernames.push(pointer[i].username)
        }

        return {
            status: status.ok, 
            users: followingUsernames
        }
        
    }

    async follow(myUsername, theirUsername) {
        //fix follow
        let db = await MongoClient.connect(this.url)
        
        let dbo = db.db(dbName)
        let coll = dbo.collection(collectionName)

        //edit me
        let query = { username: myUsername } 
        let newvalues = { $addToSet: {following: theirUsername } };

        try {
            let pointer = await coll.update(query, newvalues)
            

            if (!pointer) {
                return {status: "error", error: "user not found"}
            }

            //edit them
            query = { username: theirUsername } 
            newvalues = { $addToSet: {followers: myUsername } };
            pointer = await coll.update(query, newvalues)
            if (!pointer) {
                return {status: "error", error: "user not found"}
            }
        } catch (ex) {
            console.log(ex)
            return {status: "error", error: "user not found"}
        }
        
        console.log("now following")
        return {status: status.ok}
    }

    async unfollow(myUsername, theirUsername) {
        //fix follow
        let db = await MongoClient.connect(this.url)
        
        let dbo = db.db(dbName)
        let coll = dbo.collection(collectionName)

        //edit me
        let query = { username: myUsername } 
        let newvalues = { $pull: {following: theirUsername } };

        try {
            let pointer = await coll.update(query, newvalues)
            

            if (!pointer) {
                return {status: "error", error: "user not found"}
            }

            //edit them
            query = { username: theirUsername } 
            newvalues = { $pull: {followers: myUsername } };
            pointer = await coll.update(query, newvalues)
            if (!pointer) {
                return {status: "error", error: "user not found"}
            }
        } catch (ex) {
            console.log(ex)
            return {status: "error", error: "user not found"}
        }
        
        console.log("now following")
        return {status: status.ok}
    }



    
   
}

module.exports = UserController

