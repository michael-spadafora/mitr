var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');


var itemModule = require('../objects/item')
var newItem = itemModule.newItem

var constants = require('../constants')
var status = constants.status
var mongoUrl = constants.mongo_url
var dbName = constants.db_name
var collectionName = constants.collections.items


class ItemController {
    constructor () {
        this.url = mongoUrl;
    }

    async addItem(content, childType, username) {
        // generate key here           

        if (!content) {
            return {
                status: status.error,
                error: "no content provided"
            }
        }

        let db = await MongoClient.connect(this.url)
        let dbo = db.db(dbName)
        let coll = dbo.collection(collectionName)

        let item = newItem(content,childType,username)
        try {
            var res = await coll.insertOne(item)   
            console.log ("post id: " + res.insertedId)

            return {
                status: status.ok,
                id: res.insertedId
            }
        } catch(e) {
            return {
                status: status.error,
                error: "error adding item"
            }
        }
    }

    async getItem(id) {
        let db = await MongoClient.connect(this.url)

        let dbo = db.db(dbName)
        let coll = dbo.collection(collectionName)

        let oid = new mongo.ObjectId(id)
        let query = { _id: oid } 

        let pointer = await coll.findOne(query)

        if (!pointer) {
            return {
                status: status.error,
                error: "Item not found"
            }
        }
        else {
            console.log(pointer)

            let re = {
                id: pointer._id,
                username: pointer.username,
                timestamp: pointer.timestamp,
                property: pointer.property,
                retweeted: pointer.retweeted,
                content: pointer.content
            }
            return {
                status: status.ok,
                item: re
            }
        }
    }

    async search(timestamp, limit) {
        let db = await MongoClient.connect(this.url)
            
        let dbo = db.db(dbName)
        let coll = dbo.collection(collectionName)
        
        //edit this query to do less than
        let query = {
            timestamp: {
                $lte: timestamp
        }}

        let pointer = await coll.find(query).limit(limit).toArray()

        if (!pointer) {
            return {status: status.error, error: "not found" }
        }

        return {status: status.ok, items: pointer }
    }

    async delete(id, username) {
        let db = await MongoClient.connect(this.url)
            
        let dbo = db.db(dbName)
        let coll = dbo.collection(collectionName)

        let oid = new mongo.ObjectId(id)
        let query = { _id: oid } 

        let pointer = await coll.findOne(query)

        if (!pointer) {
            return {
                status: status.error,
                error: "Item not found"
            }
        }
        
        else {
            //may be able to refactor this into just delete one, removing findone
            let pointer = await coll.deleteOne(query)
            let re = {
                status: status.ok
            }
            return re
        }
    }
   
}

module.exports = ItemController

