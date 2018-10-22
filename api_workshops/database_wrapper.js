var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/tododb";


// Returns a promise with an object of all the lists
function getLists() {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db("tododb");
            list_cursor = dbo.collection("todoLists").find({}).toArray((err, docs) => {
                if(err) return reject(err);
                let data = {};
                for(list of docs) {
                    data[list._id] = list;
                }
                resolve(data);
                db.close();
            });
        });
    });
};

// Returns a promise with the MongoDB response
function addList(list) {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db("tododb");
            dbo.collection("todoLists").insertOne(list, (err, res) => {
                if (err) return reject(err);
                resolve(res);
                db.close();
            });
        });
    });
}

// Returns the list from the given id
function getList(id) {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db("tododb");
            list_cursor = dbo.collection("todoLists").findOne({ _id: id}, (err, doc) => {
                if(err) return reject(err);
                if(doc == undefined) return reject({errmsg: "Could not find the given document"});
                let data = {};
                data[doc._id] = doc;
                resolve(data);
                db.close();
            });
        });
    });
}

// Adds an item to the given list
function addItem(listId, item) {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db("tododb");
            // Find the list and update the items
            list_cursor = dbo.collection("todoLists").findOne({_id: listId}, (err, doc) => {
                if(err) return reject(err);
                if(doc == undefined) return reject({errmsg: "Could not find the given document"});
                let items = doc.items;
                // Add our item to the current items
                items[item._id] = item;

                // Update the items for the list
                dbo.collection("todoLists").updateOne({_id: listId}, {$set: {items: items}}, {upsert:true}, (err, res) => {
                    if(err) return reject(err);
                    resolve(res);
                    db.close();
                });
            });
        });
    });
}

// Returns promise with the specified item
function getItem(listId, itemId) {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db("tododb");
            // Find the list and update the items
            list_cursor = dbo.collection("todoLists").findOne({_id: listId}, (err, doc) => {
                if(err) return reject(err);
                if(doc == undefined) return reject({errmsg: "Could not find the given document"});
                if(!(itemId in doc.items)) return reject({errmsg: "Could not find the specified item"});
                resolve(doc.items[itemId]);
                db.close();
            });
        });
    });
}

// Deletes a specified list
function deleteList(listId) {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db("tododb");
            list_cursor = dbo.collection("todoLists").findOneAndDelete({_id: listId}, (err, result) => {
                if(err) return reject(err);
                if(result.value == undefined) return reject({errmsg: "Could not find the given document"});
                let data = {};
                data[result.value._id] = result.value;
                resolve(data);
                db.close();
            });
        });
    });
}

// Deletes a specified item
function deleteItem(listId, itemId) {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db("tododb");
            // Find the list and update the items
            list_cursor = dbo.collection("todoLists").findOne({_id: listId}, (err, doc) => {
                if(err) return reject(err);
                if(doc == undefined) return reject({errmsg: "Could not find the given document"});
                let items = doc.items;
                // Delete our item from the current items
                let item;
                if(itemId in items) {
                    item = items[itemId];
                    delete items[itemId];
                }
                // Update the items for the list
                dbo.collection("todoLists").updateOne({_id: listId}, {$set: {items: items}}, {upsert:true}, (err, res) => {
                    if(err) return reject(err);
                    resolve(item);
                    db.close();
                });
            });
        });
    });
}


// Export all of the above functions so that they can be used in another file
module.exports.getLists = getLists;
module.exports.addList = addList;
module.exports.getList = getList;
module.exports.addItem = addItem;
module.exports.getItem = getItem;
module.exports.deleteList = deleteList;
module.exports.deleteItem = deleteItem;
