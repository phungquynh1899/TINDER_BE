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
        res.status(400).send('an error occurs');
    }
})

//DELETE /user based on userID
app.delete('/user', async (req, res) => {
    try{
        const userID = req.body.userID;
        await User.findByIdAndDelete({_id: userID});
        res.send('delete user successfully');
    }
    catch(error){
        res.status(400).send('can not delete user');
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

//PATCH /user 
//nếu dữ liệu gửi tới bị thừa (ko có trong user schema) thì mongo ko quan tâm
app.patch("/user", async (req, res)=>{
    try{
        const userID = req.body.userID;
        const dataToUpdate = req.body;
        await User.findByIdAndUpdate({_id: userID}, dataToUpdate);
        res.send('update user successfully');
    }
    catch(error){
        res.send("failed to update user 's data");
    }
})
