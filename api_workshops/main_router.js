const express = require('express');
var { List, ListItem } = require('./list'); // Import our List and ListItem classes from list.js

// Create an express router 
var router = express.Router();

// Our temporary storage of Lists in our application
var lists = {};

router.get('/', (req, res) => {
    res.send('Hello World');
});

// Returns a list of all of our lists
router.get('/lists', (req, res) => {
    res.json({
        lists: lists
    });
});

// Adds a list
router.post('/lists', (req, res) => {
    let body = req.body;
    let listId = body.id;
    let listName = body.name;
    let newList = new List(listId, listName);
    lists[listId] = newList;
    res.json({ 
        status: "list added",
        data: { list: newList }
    });
});

// Returns the list information in the specified list
router.get('/lists/:id', (req,res) => {
    // Get the id from path
    let listId = req.params.id;             // get the id from the request path
    if(listId in lists) {
        res.json({
            status: "list found",
            data: { list: lists[listId] }
        });
    } else {
        res.json({ status: "list not found"} );        // will return this if list isn't found
    }
});

// Adds an item to the specified list
router.post('/lists/:id', (req, res) => {
    let body = req.body;
    let listId = req.params.id;
    // Find the item in the list
    if(listId in lists) {
        let listItem = new ListItem(body.id, body.name, body.description);
        let list = lists[listId];
        list.items[body.id] = listItem;
        res.json({ 
            status: "item added",
            data: { item: listItem }
        });
    } else {
        res.json({ status: "list not found" });
    }
});

// Deletes a list w/ given id
router.delete('/lists/:id', (req, res) => {
    // Get the id from path
    let listId = req.params.id;             // get the id from the request path

    if(listId in lists) {
        list = lists[listId];
        delete lists[listId];
        res.json({ 
            status: "list deleted", 
            data: { list: list}
        });

    } else {
        res.json({ status: "list not found" });        // will return this if list isn't found
    }
   
});

// Gets a specific item from a list
router.get('/lists/:id/:itemId', (req, res) => {
    // Find list
    let listId = req.params.id;             // get the id from the request path
    let itemId = req.params.itemId;
    
    if(listId in lists) {
        if(itemId in lists[listId].items) {
            res.json({
                status: "item found",
                data: { item: lists[listId].items[itemId] }
            });
            return;
        }
    }
    res.json({ status: "item not found" });
});

// Deletes a specific item from a list
router.delete('/lists/:id/:itemId', (req, res) => {
    let listId = req.params.id;             // get the id from the request path
    let itemId = req.params.itemId;
    
    if(listId in lists) {
        if(itemId in lists) {
            item = lists[listId].items[itemId];
            delete lists[listId].items[itemId];
            res.json({
                status: "item deleted",
                data: { item: item }
            });
            return;
        }
    }
    res.json({ status: "item not found" });
});

module.exports = router;