class User {
    constructor(id, email, username, phone, password) {
        this._id = id;
        this.email = email;
        this.username = username; 
        this.phone = phone;
        this.password = password;
    }
};

module.exports = User;