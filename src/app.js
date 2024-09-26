// 3 dong 2, 3, 12 tao thanh 1 server 
const express = require('express');
const app = express();
//thêm request handler, bắt buộc theo thứ tự
// app.use('/hi', (request, response)=>{
//     response.send('hi from server')
// })
// app.use("/", (request, response)=>{
//     response.send('/ from server')
// })

app.get("/get", (req, res)=>{
    res.send('get from get method')
});

app.post('/post', (req, res)=>{
    res.send('post from server');
})

app.delete('/delete',(req, res)=>{
    res.send('delete from server');
})

app.listen(8889);



