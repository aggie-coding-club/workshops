class ListItem {
  constructor (id, name, description) {
    this._id = id
    this.name = name
    this.description = description
  }

  toObject () {
    return {
      _id: this._id,
      name: this.name,
      description: this.description
    }
  }
}

class List {
  constructor (id, name) {
    this.items = []
    this._id = id
    this.name = name
  }

  toObject () {
    return {
      _id: this._id,
      items: this.items,
      name: this.name
    }
  }
}

// Export our classes so that they can be used in another file
module.exports = { List, ListItem }
