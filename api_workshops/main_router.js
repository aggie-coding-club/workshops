const express = require('express');
var { List, ListItem } = require('./list'); // Import our List and ListItem classes from list.js
var { getLists, addList, getList, addItem, getItem, deleteList, deleteItem } = require('./database_wrapper');

// Create an express router 
var router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

// Returns a list of all of our lists
router.get('/lists', (req, res) => {
    getLists().then(lists => {
        res.json({
            lists: lists
        });
    }).catch(err => {
        res.send(err);
    });

});

// Adds a list
router.post('/lists', (req, res) => {
    let body = req.body;
    let listId = body.id;
    let listName = body.name;
    let newList = new List(listId, listName);

    addList(newList).then(res => {
        res.json({ 
            status: "list added",
            data: { list: newList }
        });
    }).catch(err => {
        res.send(err);
    });

});

// Returns the list information in the specified list
router.get('/lists/:id', (req,res) => {
    // Get the id from path
    let listId = Number(req.params.id);             // get the id from the request path
    getList(listId).then(data => {
        res.json({
            status: "list found",
            data: { list: data }
        });
    }).catch(err => {
        res.send(err);
    });

});

// Adds an item to the specified list
router.post('/lists/:id', (req, res) => {
    let body = req.body;
    let listId = Number(req.params.id);
    let listItem = new ListItem(body.id, body.name, body.description);

    addItem(listId, listItem).then((mongo_res) => {
        res.json({ 
            status: "item added",
            data: { item: listItem }
        });
    }).catch(err => {
        res.send(err);
    })

});

// Deletes a list w/ given id
router.delete('/lists/:id', (req, res) => {
    // Get the id from path
    let listId = Number(req.params.id);             // get the id from the request path

    deleteList(listId).then(data => {
        res.json({ 
            status: "list deleted", 
            data: { list: data}
        });
    }).catch(err => {
        res.send(err);
    });
   
});

// Gets a specific item from a list
router.get('/lists/:id/:itemId', (req, res) => {
    // Find list
    let listId = Number(req.params.id);             // get the id from the request path
    let itemId = Number(req.params.itemId);
    getItem(listId, itemId).then(data => {
        res.json({
            status: "item found",
            data: { item: data }
        });
    }).catch(err => {
        res.send(err);
    });

});

// Deletes a specific item from a list
router.delete('/lists/:id/:itemId', (req, res) => {
    let listId = Number(req.params.id);             // get the id from the request path
    let itemId = Number(req.params.itemId);

    deleteItem(listId, itemId).then(data => {
        res.json({
            status: "item deleted",
            data: { item: data }
        });
    }).catch(err => {
        res.send(err);
    });
    
});

module.exports = router;