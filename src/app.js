// 3 dong 2, 3, 12 tao thanh 1 server 
const express = require('express');
const app = express();

app.use("/handle", (req, res) => {
    //cái hàm này chính là route handler
    //nếu trong ruột hàm ko có gì hết thì khi gửi req tới /handle, vòng tròn trên browser sẽ xoay hoài đến timeout thì thôi
    //nên bắt buộc phải có res.send cái gì đó
})

app.use("/anotherHandler",
    (req, res, next) => {
        //đây là hàm handler thứ 1
        //hàm send chỉ được gửi 1 lần tới client
        res.send('đây là handler thứ nhất');
        //hàm next đeer gọi handler thứ 2, nếu ko có next() thì node chỉ thực thi hàm handler thứ 1
        //muốn sử dụng next() phải thêm next param vào 
        //chỉ cần có next, chắc chắn handler thứ 2 sẽ được thực thi
        //nhưng send chỉ được gửi 1 lần
        next();
        console.log("kêt thúc hàm handler thứ nhất");
    },
    (req, res) => {
        //đây là hàm handler thứ 2
        console.log('băt đầu handler thứ 2');
        //do hàm send chỉ được gửi 1 lần tới client nên cho dù handler thứ 2 được gọi bởi next() thì send này chắc chắn báo lỗi
        res.send("đây là handler thứ hai"); //do handler 1 đã send tới client rồi, send lần 2 nữa nên bi báo lỗi
        console.log("kêt thúc hàm handler thứ hai");
    })

    app.get("/handlerWithMultipleNext", 
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
            //next(); //tới đây chắc chắn lỗi do next kỳ vọng có hàm 4th handler nhưng ko có
            //nếu bỏ next() ở hàm này thì chắc chắn browser sẽ treo do chờ quài không thấy res.send() đâu
        },

    )
app.listen(8889);



