// 3 dong 2, 3, 12 tao thanh 1 server 
const express = require('express');
const app = express();



app.get("/error", (req, res)=>{
    throw new Error('im an error');
})

//midleware đảm nhận error bắt buộc phải ở dưới cùng vì request đi từ trên xuống
app.use("/", (err, req, res, next) =>{
    if(err){
        res.status(500).send('something went wrong, please contact support team');
    }
})
app.listen(8889);



