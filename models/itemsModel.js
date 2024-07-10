class Item {
    constructor({ user_id, name, description, price, quantity, createdAt, updatedAt, id }) {
        this.user_id = user_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this._id = id;
    }
};

module.exports = Item;