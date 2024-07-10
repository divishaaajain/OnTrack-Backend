class User {
    constructor({email, username, phone, password, createdAt, updatedAt, id }) {
        this.email = email;
        this.username = username; 
        this.phone = phone;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this._id = id;
    }
};

module.exports = User;