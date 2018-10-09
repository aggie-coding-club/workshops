const express = require('express');
var { List, ListItem } = require('./list');

var router = express.Router();

var lists = [];

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/lists', (req, res) => {
    res.json({
        lists: lists
    });
});

router.post('/lists', (req, res) => {
    var body = req.body;
    var listId = body.id;
    var listName = body.name;
    var newList = List(listId, listName);
    lists.push(newList);
    res.send(`${listId}: ${listName}`);
});

router.get('/lists/:id', (req,res) => {
    // Get the id from path
    var listId = req.params.id;
    // Find the item in the list
    for(let i=0; i<lists.length; i++) {
        var list = lists[i];
        if(list.id === listId) {
            res.json(list.items);
            break;
        }
    }

});

router.post('/lists/:id', (req, res) => {
    var body = req.body;
    var listId = req.params.id;
    // Find the item in the list
    for(let i=0; i<lists.length; i++) {
        var list = lists[i];
        if(list.id === listId) {
            var listItem = ListItem(body.id, body.name, body.description);
            list.items.push(listItem);
            res.send('Got it');
        }
    }
});

module.exports = router;