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
        res.send("fail to add new user" + error);
    }
})

//PATCH /user 
//nếu dữ liệu gửi tới bị thừa (ko có trong user schema) thì mongo ko quan tâm
app.patch("/user/:userID", async (req, res)=>{
    try{
        //mình muốn cắt quyền update email 
        //mình muốn cắt quyền update userID (chỉnh /user thành user/:userID)
        const userID = req.params?.userID;
        const dataToUpdate = req.body;
        const ALLOWED_UPDATE = ['password', 'age', 'gender', 'about', 'skills'];
        //Object.keys(dataToUpdate) trả về ["userID", "email", "lastName",...]
        //every duyệt qua từng phần từ trong ["userID", "email", "lastName",...]
        //nếu có 1 phần từ không thoã callback ==> isAllowedToUpdate = false 
        //nhớ phải return trong every
        const isAllowedToUpdate = Object.keys(dataToUpdate).every((key)=>{
            return ALLOWED_UPDATE.includes(key);
        });
        console.log(dataToUpdate);
       
        console.log(isAllowedToUpdate);
        
        if(!isAllowedToUpdate){
            throw new Error('các trường cần update không hợp lệ');
        }
        await User.findByIdAndUpdate({_id: userID}, dataToUpdate, 
            {runValidators: true});
        res.send('update user successfully');
    }
    catch(error){
        res.send("failed to update user 's data" + error);
    }
})
