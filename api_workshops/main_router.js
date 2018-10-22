const express = require('express')
var { List, ListItem } = require('./list') // Import our List and ListItem classes from list.js
var {
  getLists,
  addList,
  getList,
  addItem,
  getItem,
  deleteList,
  deleteItem
} = require('./database_wrapper')

// Create an express router
var router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World')
})

// Returns a list of all of our lists
router.get('/lists', async (req, res) => {
  try {
    const lists = await getLists()
    res.json(lists)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
})

// Adds a list
router.post('/lists', async (req, res) => {
  const { id: listId, name: listName } = req.body
  let newList = new List(Number(listId), listName)

  try {
    const insertionResult = await addList(newList)
    res.status(201).json(insertionResult)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
})

// Returns the list information in the specified list
router.get('/lists/:id', async (req, res) => {
  // Get the id from path
  const { id } = req.params
  const listId = Number(id) // get the id from the request path
  try {
    const list = await getList(listId)
    res.json(list)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
})

// Adds an item to the specified list
router.post('/lists/:id', async (req, res) => {
  const { id } = req.params
  const listId = Number(id)
  const { itemIdStr, name, description } = req.body
  const itemId = Number(itemIdStr)
  let listItem = new ListItem(itemId, name, description)

  try {
    const list = await addItem(listId, listItem)
    res.status(204).json(list)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
})

// Deletes a list w/ given id
router.delete('/lists/:id', async (req, res) => {
  const { id } = req.params // get the id from the request path
  const listId = Number(id)

  try {
    await deleteList(listId)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
})

// Gets a specific item from a list
router.get('/lists/:id/:itemId', async (req, res) => {
  // Find list
  const { id: listIdStr, itemId: itemIdStr } = req.param
  let listId = Number(listIdStr)
  let itemId = Number(itemIdStr)

  try {
    const item = await getItem(listId, itemId)
    res.json(item)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
})

// Deletes a specific item from a list
router.delete('/lists/:id/:itemId', async (req, res) => {
  const { id: listIdStr, itemId: itemIdStr } = req.params
  let listId = Number(listIdStr)
  let itemId = Number(itemIdStr)

  try {
    await deleteItem(listId, itemId)
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
})

module.exports = router
