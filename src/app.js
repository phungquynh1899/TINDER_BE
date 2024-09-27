// 3 dong 2, 3, 12 tao thanh 1 server 
const express = require('express');
const {connectDB} = require('./config/database');
const app = express();

connectDB()
.then(() => {
    console.log('successfully connect to database');
    app.listen(8889);
})
.catch((error) => {
    console.log('failed to connect to database, please contact to support team');
})



