// 3 dong 2, 3, 12 tao thanh 1 server 
const express = require('express');
const {connectDB} = require('./config/database');
const { User } = require('./models/user')
const app = express();

connectDB()
.then(() => {
    console.log('successfully connect to database');
    app.listen(8889);
})
.catch((error) => {
    console.log('failed to connect to database, please contact to support team');
})

//dữ liệu gửi tới ở dạng json, nodejs ko đọc được
//express.json () không có ghi route cụ thể 
//để bắt tất cả dữ liệu gửi tới tất cả đường link và chuyển dữ liệu thành js object
app.use(express.json());

//GET /user to search a user by email
app.get("/user", async (req, res) =>{
    try{
        const userEmail = req.body.email;
        //trả về array các user có email 
        const userInfo = await User.find({email: userEmail});
        if(userInfo.length === 0){
            res.status(404).send('cannot found this user')
        }
        else{
            res.send(userInfo);
        }
    }
    catch(error){
        res.send('an error occurs');
    }
})

//GET /feed to sget all the users
app.get("/feed", async (req, res) =>{
    try{
        const userInfo = await User.find({});
        res.send(userInfo);
    }
    catch(error){
        res.send('an error occurs');
    }
})

app.post("/signup", async (req, res) =>{
    try{
        //dữ liệu gửi từ postman bằng cách sử dung body
        const user = new User(req.body);
        await user.save();
        res.send("add user sucessfully");
    }
    catch(error){
        res.send("fail to add new user");
    }
})


