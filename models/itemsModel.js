class Item {
    constructor({user_id, name, description, price, quantity, id}) {
        this.user_id = user_id;
        this.name = name;
        this.description = description; 
        this.price = price;
        this.quantity = quantity;
        this._id = id;
    }
};

module.exports = Item;