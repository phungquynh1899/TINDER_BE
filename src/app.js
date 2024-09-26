// 3 dong 2, 3, 12 tao thanh 1 server 
const express = require('express');
const app = express();

//khi gọi tới /handler thì sẽ đi qua các hàm /, hàm handler số 1 2 3 
//tại sao lại đi qua hàm / mà ko dừng lại
//vì khi 1 request đi tới, express sẽ cố gắng tìm tất cả các hàm match với /handler
//ở trong code này có / và /handler match với /hander của request 
//nên các hàm / , 1st, 2nd, 3rd được thực thi từ trên xuống
// cho dù giữa đường có res.send() thì tất cả các hàm match với /handler đều được thực thi
// quy ước từ đây về sau: 
// hàm / và các hàm hanlder 1, 2, 3 đều được gọi chung là midleware handler 
// trong 4 hàm này, hàm nào chứa res.send mới được gọi là route handler
app.use("/", (req, res, next) => {
    console.log('im / handler ');
    res.send('hello from the / handler');
    next();
})

app.get("/handler",
    (req, res, next) => {
        console.log('the 1st handler');
        next();
    },
    (req, res, next) => {
        console.log('the 2nd handler');
        next();
    },
    (req, res, next) => {
        console.log('the 3rd handler');
        res.send('hello from the 3rd handler');
    },

)
app.listen(8889);



