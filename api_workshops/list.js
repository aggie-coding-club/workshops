class ListItem {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

class List {
    items = [];
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

module.exports.List = List;
module.exports.ListItem = ListItem;