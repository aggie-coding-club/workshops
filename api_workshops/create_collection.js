// This is just used to create the collection initially

var MongoClient = require('mongodb').MongoClient
var password = fs.readFileSync(process.cwd()+"/.env");
var url = `mongodb+srv://acc:${password}@cluster0-hdiqu.gcp.mongodb.net/test?retryWrites=true`

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
  if (err) throw err
  const dbo = db.db('tododb')
  dbo.createCollection('todoLists', function (err, res) {
    if (err) throw err
    console.log('Collection created!')
    db.close()
  })
})
