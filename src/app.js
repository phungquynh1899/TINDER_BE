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

app.post("/signup", async (req, res) =>{
    try{
        const userObj = {
            firstName: 'quynh',
            lastName: 'nguyen',
            email: "quynhnguyen123@gmail.com",
            password: '123456789'
        }
    
        const user = new User(userObj);
        await user.save();
        res.send("add user sucessfully");
    }
    catch(error){
        res.send("fail to add new user");
    }
})


