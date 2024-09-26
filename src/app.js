// 3 dong 2, 3, 12 tao thanh 1 server 
const express = require('express');
const app = express();

//yêu cầu: mỗi khi /admin muốn làm gì đều phải trải qua bước xác thực
//getAllData hoặc deleteUser đều cần qua bước xác thực
//mỗi lần đều phải viết code, mình có thể gói đoạn code xác thực thành 1 hàm, nhưng mỗi lần đều phải gọi tên hàm ra rất phiền
//midle sẽ giải quyết được vấn đề gọi hàm này
// app.use("/admin")

// app.get("/admin/getAllData", (req, res) => {
//     // bắt đầu xác thực
//     const token = "xyzabcdjfhduifh";
//     const isAdminAuthorized = token === "xyz";
//     // kết thúc xác thực
//     if (isAdminAuthorized) {
//         res.send("All Data Sent");
//     } else {
//         res.status(401).send("Unauthorized request");
//     }
// });
// app.get("/admin/deleteUser", (req, res) => {
//     // bắt đầu xác thực
//     const token = "xyzabcdjfhduifh";
//     const isAdminAuthorized = token === "xyz";
//     // kết thúc xác thực
//     if (isAdminAuthorized) {
//         res.send("Deleted a user");
//     } else {
//         res.status(401).send("Unauthorized request");
//     }
// });


//ta biết được mỗi lần /admin/xxx đều phải qua /admin, nên ta sẽ đặt phần xác thực ở đây
//mình có thể dùng app.use hoặc app.all 
//mình có thể dùng app.get('/admin') hoặc app.post('/admin') nhưng nếu chỉ dùng 2 cái này thì hacker có thể vào bằng đường app.put('/admin') nên khuyên dùng vẫn là app.use

// app.use("/admin", (req, res, next) => {
//     console.log('tôi là midleware của /admin');
//     // bắt đầu xác thực
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";
   
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized request");
//     }
//     else{
//         next();
//     }
// })

// app.get("/admin/getAllData", (req, res) => {
//     res.send("All Data Sent");
// });
// app.get("/admin/deleteUser", (req, res) => {
//     res.send("Deleted a user");
// });

//đúng theo chuẩn, mình sẽ bắt app.use("/admin") ra thành 1 module
//trong src, ta tạo thư mục midlewares, sau đó tạo auth.js

const { authFunction } = require('./midlewares/auth');

app.use("/admin", authFunction);

app.get("/admin/getAllData", (req, res) => {
    res.send("All Data Sent");
});
app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
});

app.listen(8889);



