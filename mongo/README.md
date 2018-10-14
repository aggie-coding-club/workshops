Based on/modified from [W3Schools](https://www.w3schools.com/nodejs/nodejs_mongodb.asp)

## Install Mongo for npm
```npm install mongodb```

## Include in js file
```javascript
var mongo = require('mongodb'); 
```

## Create a database if it does not already exist
```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tododb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
```

Run the file: ```node <filename>.js```

## Create a collection (a table in SQL terms)
```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tododb");
  dbo.createCollection("todoLists", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); 
```

## Insert a single document (item) into the database
```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tododb");
  var myobj = { _id: 1, name: "Groceries" };
  dbo.collection("todoLists").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    console.log('Resonse:',res);
    db.close();
  });
}); 
```

You can use the ```insertMany``` function to insert many objects at once. <br/>
The ```_id``` field is a special field in MongoDB that is unique. If it is not provided, a random one will be generated.

## Finding/Querying data
```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tododb");
  var query = { name: "Groceries" };
  dbo.collection("todoList").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); 
```

You can also use the ```findOne``` function or even just use ```find({})``` to get everything.<br/>
You can also use regular expressions, which I will not go into.




