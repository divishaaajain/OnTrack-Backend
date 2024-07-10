class Item {
    constructor(id, user_id, name, description, price, quantity) {
        this._id = id;
        this.user_id = user_id;
        this.name = name;
        this.description = description; 
        this.price = price;
        this.quantity = quantity;
    }
};

module.exports = Item;