// This is just used to create the collection initially

var MongoClient = require('mongodb').MongoClient
var password = fs.readFileSync(process.cwd()+"/.env");
var url = `mongodb://acc:${password}@cluster0-shard-00-00-hdiqu.gcp.mongodb.net:27017,cluster0-shard-00-01-hdiqu.gcp.mongodb.net:27017,cluster0-shard-00-02-hdiqu.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
  if (err) throw err
  const dbo = db.db('tododb')
  dbo.createCollection('todoLists', function (err, res) {
    if (err) throw err
    console.log('Collection created!')
    db.close()
  })
})
