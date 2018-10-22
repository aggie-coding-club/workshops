// This is just used to create the collection initially

var MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
  if (err) throw err
  const dbo = db.db('tododb')
  dbo.createCollection('todoLists', function (err, res) {
    if (err) throw err
    console.log('Collection created!')
    db.close()
  })
})
