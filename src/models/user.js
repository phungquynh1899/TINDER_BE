const mongoose = require('mongoose');

//giống create table trong sql server
const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})
//User bắt buộc viết hoa, coi như model là 1 class, tên class thì phải viết hoa
//coi map table sang class
const User = mongoose.models(userSchema);

module.exports = {User: User}