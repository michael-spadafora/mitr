status = {
    ok: 200,
    error: 500
}

mongo_url = "mongodb://localhost:27017/"

db_name = "mitr"

collections = {
    users: "users",
    items: "items"
}



exports.status = status
exports.mongo_url = mongo_url
exports.db_name = db_name
exports.collections = collections