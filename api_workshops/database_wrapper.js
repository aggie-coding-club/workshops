var mongo = require('mongodb')
var fs = require('fs');

var MongoClient = mongo.MongoClient
var password = fs.readFileSync('.env').toString();
var url = `mongodb://acc:${password}@cluster0-shard-00-00-hdiqu.gcp.mongodb.net:27017,cluster0-shard-00-01-hdiqu.gcp.mongodb.net:27017,cluster0-shard-00-02-hdiqu.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
const options = { useNewUrlParser: true }

const DB_NAME = 'tododb'
const LIST_COLLECTION_STR = 'todoLists'

/**
 * Retrieves all of the lists in the database.
 * @param {String} dbName - The database name to use (FOR TESTING ONLY)
 * @returns {Promise} The returned Promise resolves to an array of list documents.
 */
async function getLists (dbName = DB_NAME) {
  let db
  try {
    db = await MongoClient.connect(url, options)
    const dbo = db.db(dbName)
    const listCollection = dbo.collection(LIST_COLLECTION_STR)
    const docs = await listCollection.find().toArray()
    db.close()
    return docs
  } catch (err) {
    console.error(err)
  }
}

/**
 * Adds a new list to the collection.
 * @param {List} list `List` to add to the collection.
 * @param {String} dbName - The database name to use (FOR TESTING ONLY)
 * @returns {Promise} `Promise` that resolves to a MongoDB `InsertOneWriteOpResult`
 */
async function addList (list, dbName = DB_NAME) {
  let db
  try {
    db = await MongoClient.connect(url, options)
    const dbo = db.db(dbName)
    const listCollection = dbo.collection(LIST_COLLECTION_STR)
    const opResult = await listCollection.insertOne(list)
    db.close()
    return opResult.ops[0]
  } catch (err) {
    console.log()
    console.error(err)
  }
}

/**
 * Retrieves a single `List`, given its id.
 * @param {Number} id The unique identifier of the `List` to look for.
 * @param {String} dbName - The database name to use (FOR TESTING ONLY)
 * @returns {Promise} Promise resolving to a `Document` or `null`
 */
async function getList (id, dbName = DB_NAME) {
  let db
  try {
    db = await MongoClient.connect(url, options)
    const dbo = db.db(dbName)
    const listCollection = dbo.collection(LIST_COLLECTION_STR)

    const result = await listCollection.findOne({ _id: id })
    db.close()
    return result
  } catch (err) {
    console.error(err)
  }
}

/**
 * Adds an item to a list (if it exists)
 * @param {Number} listId The unique identifier of the `List`.
 * @param {ListItem} item The `ListItem` to add.
 * @param {String} dbName - The database name to use (FOR TESTING ONLY)
 * @returns {Promise} Promise resolving to the updated document
 */
async function addItem (listId, item, dbName = DB_NAME) {
  let db
  try {
    db = await MongoClient.connect(url, options)
    const dbo = db.db(dbName)
    const listCollection = dbo.collection(LIST_COLLECTION_STR)

    const updateOperation = {
      // Don't know about $push? Check it out here:
      // https://docs.mongodb.com/manual/reference/operator/update/push/
      $push: {
        items: item
      }
    }

    // Don't know about findOneAndUpdate? Check it out here:
    // http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOneAndUpdate
    const updatedDoc = await listCollection.findOneAndUpdate(
      { _id: listId },
      updateOperation,
      { returnOriginal: false }
    )
    db.close()
    return updatedDoc
  } catch (err) {
    console.error(err)
  }
}

// Returns promise with the specified item
async function getItem (listId, itemId, dbName = DB_NAME) {
  let db
  try {
    db = await MongoClient.connect(url, options)
    const dbo = db.db(dbName)
    const listCollection = dbo.collection(LIST_COLLECTION_STR)

    // Don't know about MongoDB projections? Check them out here:
    // https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/
    const projection = {
      _id: false,
      items: {
        // Don't know about the $elemMatch operator? Check it out here:
        // https://docs.mongodb.com/manual/reference/operator/projection/elemMatch/
        $elemMatch: {
          _id: itemId
        }
      }
    }

    const list = await listCollection.findOne({ _id: listId }, projection)
    db.close()
    if (list) {
      return list.items[0]
    }
    return null
  } catch (err) {
    console.error(err)
  }
}

/**
 * Deletes a `List` from the database.
 * @param {Number} listId The unique identifer of the `List` to delete
 * @param {String} dbName - The database name to use (FOR TESTING ONLY)
 * @returns {Promise} Promise resolving to DeleteWriteOpResultObject
 */
async function deleteList (listId, dbName = DB_NAME) {
  let db
  try {
    db = await MongoClient.connect(url, options)
    const dbo = db.db(dbName)
    const listCollection = dbo.collection(LIST_COLLECTION_STR)
    const result = await listCollection.deleteOne({ _id: listId })
    db.close()
    return result
  } catch (err) {
    console.error(err)
  }
}

/**
 * Deletes an item from a `List`
 * @param {Number} listId The unique identifier of the `List` to delete an item from
 * @param {Number} itemId The unique identifier of the `ListItem` to delete
 * @param {String} dbName - The database name to use (FOR TESTING ONLY)
 */
async function deleteItem (listId, itemId, dbName = DB_NAME) {
  let db
  try {
    db = await MongoClient.connect(url, options)
    const dbo = db.db(dbName)
    const listCollection = dbo.collection(LIST_COLLECTION_STR)

    const updateOperation = {
      // Don't know about the $pull operator? Check it out here:
      // https://docs.mongodb.com/manual/reference/operator/update/pull/
      $pull: {
        items: {
          _id: itemId
        }
      }
    }

    const result = await listCollection.updateOne(
      { _id: listId },
      updateOperation
    )
    db.close()
    return result
  } catch (err) {
    console.error(err)
  }
}

// Export all of the above functions so that they can be used in another file
module.exports = {
  getLists,
  addList,
  getList,
  addItem,
  getItem,
  deleteList,
  deleteItem
}
