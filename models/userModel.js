class User {
    constructor(email, username, phone, password, id) {
        this.email = email;
        this.username = username; 
        this.phone = phone;
        this.password = password;
        this._id = id;
    }
};

module.exports = User;