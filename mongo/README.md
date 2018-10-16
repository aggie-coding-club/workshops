Based on/modified from [W3Schools](https://www.w3schools.com/nodejs/nodejs_mongodb.asp)

## Install MongoDB's Node.JS driver
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

Run the file: `node <filename>.js`

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

You can use the [`insertMany`](https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/) function to insert many objects at once.

The `_id` field is a special field in MongoDB that is unique. If it is not provided, a random one will be generated.

## Finding/Querying data
```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tododb");
  var query = { name: "Groceries" };
  dbo.collection("todoLists").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); 
```

You can also use the [`findOne`](https://docs.mongodb.com/manual/reference/method/db.collection.findOne/) function or even just use [`find({})`](https://docs.mongodb.com/manual/reference/method/db.collection.find/) to get everything.
You can also use [`regular expressions`](https://docs.mongodb.com/manual/reference/operator/query/regex/), which I will not go into.
