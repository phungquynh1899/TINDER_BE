const mongoose = require('mongoose');
//
const validator = require('validator');
//giống create table trong sql server
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        //sử dụng validator library
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email data is not valid');
            }
        }
    },
    password: {
        type: String,
        //sử dụng validator library
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('password is not valid');
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photo: {
        type: String,
        //sử dụng validator library
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Photo url is not valid');
            }
        }
    },
    about:{
        type: String,
        default: "this is default about for all users"
    },
    skills: {
        //an array of string
        type: [String],
        validate(arrayOfSkills){
            if(arrayOfSkills.length > 20){
                throw new Error("Skills data is not allowed to greater than 20");
            }
        }
    }
},{
    timestamp: true
})
//User bắt buộc viết hoa, coi như model là 1 class, tên class thì phải viết hoa
//coi map table sang class
//model khong co s 
//"User" trong model là tên bảng trong mongodb
//thực tế mongo tự chuyển User thành users
const User = mongoose.model("User", userSchema);

module.exports = {User: User}