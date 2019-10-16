class Item {
    constructor(username, property, retweeted, content, timestamp, childType) {
        this.username = username
        this.childType = childType
        this.property = property
        this.retweeted = retweeted
        this.content = content
        this.timestamp = timestamp
    }
}

newItem = function(content, childType, username) {
    let timestamp = Math.floor(new Date() / 1000)
    let tweet = new Item(username, {likes: 0}, 0, content, timestamp, childType)
    return tweet
}

exports.Item = Item
exports.newItem = newItem
    