/* global describe it afterEach */
var MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const {
  getLists,
  addList,
  getList,
  addItem,
  getItem,
  deleteList,
  deleteItem
} = require('../database_wrapper')
const { List, ListItem } = require('../list')

const TEST_DB_NAME = 'test'

let firstList = new List(1, 'First List')
let secondList = new List(2, 'Second List')
let listItem = new ListItem(1, 'First Item', 'Generic description')

const url = 'mongodb://localhost:27017/'
const options = { useNewUrlParser: true }

afterEach(done => {
  MongoClient.connect(url, options).then(db => {
    const dbo = db.db(TEST_DB_NAME)
    dbo.dropDatabase().then(() => {
      firstList = new List(1, 'First List')
      secondList = new List(2, 'Second List')
      listItem = new ListItem(1, 'First Item', 'Generic description')
      db.close(done)
    })
  })
})

describe('getLists', () => {
  it('Should retrieve no lists if none exist', async () => {
    const lists = await getLists(TEST_DB_NAME)
    assert.deepStrictEqual(lists, [])
  })

  it('Should retrieve all lists in the collection', async () => {
    await addList(firstList, TEST_DB_NAME)
    await addList(secondList, TEST_DB_NAME)
    const lists = await getLists(TEST_DB_NAME)
    const listIds = lists.map(list => list._id)
    const expectedIds = [1, 2]

    assert.deepStrictEqual(listIds, expectedIds)
  })
})

describe('getList', () => {
  it('Should retrieve an individual list', async () => {
    await addList(secondList, TEST_DB_NAME)
    await addList(firstList, TEST_DB_NAME)
    const list = await getList(firstList._id, TEST_DB_NAME)
    assert.deepStrictEqual(firstList.toObject(), list)
  })
})

describe('addList', () => {
  it('Should add a list successfully', async () => {
    const insertOneWriteOpResult = await addList(firstList, TEST_DB_NAME)
    const { result: { n, ok } } = insertOneWriteOpResult
    assert.strictEqual(n, 1)
    assert.strictEqual(ok, 1)
  })

  it('Should add a list correctly', async () => {
    await addList(firstList, TEST_DB_NAME)

    const actual = await getList(firstList._id, TEST_DB_NAME)

    const expected = {
      _id: firstList._id,
      items: firstList.items,
      name: firstList.name
    }

    assert.deepStrictEqual(expected, actual)
  })
})

describe('addItem', () => {
  it('Should add a single item', async () => {
    await addList(firstList, TEST_DB_NAME)
    const expected = [listItem.toObject()]
    const writeResult = await addItem(firstList._id, listItem, TEST_DB_NAME)
    const { items: actual } = writeResult.value

    assert.deepStrictEqual(expected, actual)
  })
})

describe('getItem', () => {
  it('Should get a single item', async () => {
    await addList(firstList, TEST_DB_NAME)
    await addItem(firstList._id, listItem, TEST_DB_NAME)

    const expected = listItem.toObject()
    const actual = await getItem(firstList._id, listItem._id, TEST_DB_NAME)
    assert.deepStrictEqual(actual, expected)
  })
})

describe('deleteList', () => {
  it('Should delete a list', async () => {
    await addList(firstList, TEST_DB_NAME)
    await deleteList(firstList._id, TEST_DB_NAME)
    const db = await MongoClient.connect(url, options)
    const dbo = db.db(TEST_DB_NAME)
    const listCollection = dbo.collection('todoLists')
    const results = await listCollection
      .find({ _id: firstList._id })
      .limit(1)
      .toArray()
    assert.strictEqual(results.length, 0)
  })
})

describe('deleteItem', () => {
  it('Should delete an item', async () => {
    await addList(firstList, TEST_DB_NAME)
    await addItem(firstList._id, listItem, TEST_DB_NAME)

    await deleteItem(firstList._id, listItem._id, TEST_DB_NAME)

    const list = await getList(firstList._id, TEST_DB_NAME)

    assert.strictEqual(list.items.length, 0)
  })
})
