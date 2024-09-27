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
//model khong co s 
//"User" trong model là tên bảng trong mongodb
//thực tế mongo tự chuyển User thành users
const User = mongoose.model("User", userSchema);

module.exports = {User: User}